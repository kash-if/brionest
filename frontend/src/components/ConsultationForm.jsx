import React, { useState } from "react"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select"
import {
	Calendar,
	Phone,
	Mail,
	User,
	MessageSquare,
	Building2,
} from "lucide-react"
import { toast, Bounce } from "react-toastify"

// ─── Shared toast config ──────────────────────────────────────────────────────
const toastConfig = {
	position: "top-right",
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: false,
	pauseOnHover: true,
	draggable: true,
	theme: "colored",
	transition: Bounce,
}

// ─── Validation rules ─────────────────────────────────────────────────────────
// Returns an errors object { fieldName: "error message" }
// Empty object means all valid.
const validateForm = (data) => {
	const errors = {}

	// Name — required, max 100 chars
	if (!data.name.trim()) {
		errors.name = "Full name is required"
	} else if (data.name.trim().length > 100) {
		errors.name = "Name must be under 100 characters"
	}

	// Email — required, basic format check
	if (!data.email.trim()) {
		errors.email = "Email address is required"
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
		errors.email = "Enter a valid email address"
	}

	// Phone — required, Indian mobile number (10 digits, optionally prefixed with +91)
	const rawPhone = data.phone.trim().replace(/\s+/g, "")
	if (!rawPhone) {
		errors.phone = "Phone number is required"
	} else if (!/^(\+91)?[6-9]\d{9}$/.test(rawPhone)) {
		errors.phone = "Enter a valid Indian mobile number (e.g. +91 98765 43210)"
	}

	// Customer type — required, must be selected
	if (!data.customerType) {
		errors.customerType = "Please select your customer type"
	}

	return errors
}

// ─── Component ────────────────────────────────────────────────────────────────
const ConsultationForm = ({ userType }) => {
	const initialForm = {
		name: "",
		email: "",
		phone: "",
		customerType: "",
		propertyType: "",
		preferredDate: "",
		message: "",
	}

	const [formData, setFormData] = useState(initialForm)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [fieldErrors, setFieldErrors] = useState({}) // { name: "...", email: "..." }
	const [touched, setTouched] = useState({}) // tracks which fields user has interacted with

	// Sync customerType when parent changes userType prop
	// React.useEffect(() => {
	// 	setFormData((prev) => ({ ...prev, customerType: userType }))
	// }, [userType])

	// ─── Handlers ──────────────────────────────────────────────────────────────

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))

		// Re-validate this field live once the user has touched it
		if (touched[name]) {
			const errors = validateForm({ ...formData, [name]: value })
			setFieldErrors((prev) => ({
				...prev,
				[name]: errors[name] || null,
			}))
		}
	}

	const handleSelectChange = (name, value) => {
		setFormData((prev) => ({ ...prev, [name]: value }))
		setTouched((prev) => ({ ...prev, [name]: true }))

		// Re-validate immediately on select (user explicitly made a choice)
		if (touched[name] || true) {
			const errors = validateForm({ ...formData, [name]: value })
			setFieldErrors((prev) => ({
				...prev,
				[name]: errors[name] || null,
			}))
		}
	}

	// Mark field as touched on blur so error appears after user leaves the field
	const handleBlur = (e) => {
		const { name } = e.target
		setTouched((prev) => ({ ...prev, [name]: true }))
		const errors = validateForm(formData)
		setFieldErrors((prev) => ({
			...prev,
			[name]: errors[name] || null,
		}))
	}

	// ─── Submit ────────────────────────────────────────────────────────────────
	const handleSubmit = async (e) => {
		e.preventDefault()

		// Run full validation on submit — mark all fields as touched
		const errors = validateForm(formData)
		const mandatoryFields = ["name", "email", "phone", "customerType"]
		const allTouched = mandatoryFields.reduce(
			(acc, f) => ({ ...acc, [f]: true }),
			{},
		)
		setTouched((prev) => ({ ...prev, ...allTouched }))

		if (Object.keys(errors).length > 0) {
			setFieldErrors(errors)
			// Scroll to first error field
			const firstErrorField = mandatoryFields.find((f) => errors[f])
			if (firstErrorField) {
				document.getElementById(firstErrorField)?.scrollIntoView({
					behavior: "smooth",
					block: "center",
				})
			}
			return // Stop — do not call API
		}

		setFieldErrors({})
		setIsSubmitting(true)

		try {
			const payload = {
				name: formData.name || "",
				email: formData.email || "",
				phone: formData.phone || "",
				customerType: formData.customerType || "",
				propertyType: formData.propertyType || "",
				preferredDate: formData.preferredDate || "",
				message: formData.message || "",
				// Send timestamp from backend so it's consistent (IST)
				timestamp: new Date().toLocaleString("en-IN", {
					timeZone: "Asia/Kolkata",
				}),
				status: "New",
			}

			const params = new URLSearchParams(payload)
			const response = await fetch(
				`${process.env.REACT_APP_APPS_SCRIPT_URL}?${params}`,
				{ method: "GET" },
			)

			// ── 422 — validation errors from express-validator (backend safety net) ──
			if (response.status === 422) {
				toast.error(
					<div>
						<strong>Validation failed</strong>
						<br />
						<span>Please check your inputs and try again.</span>
					</div>,
					toastConfig,
				)
				return
			}

			// ── 429 — rate limited ─────────────────────────────────────────────
			if (response.status === 429) {
				toast.error(
					<div>
						<strong>Too many requests</strong>
						<br />
						<span>Please try again after 15 minutes.</span>
					</div>,
					toastConfig,
				)
				return
			}

			// ── Parse JSON — always after status checks ────────────────────────
			let result
			try {
				result = await response.json()
			} catch {
				throw new Error(
					`Server error: ${response.status} ${response.statusText}`,
				)
			}

			// ── Any other non-2xx ──────────────────────────────────────────────
			if (!response.ok) {
				throw new Error(
					result?.error || `Request failed with status ${response.status}`,
				)
			}

			// ── Success ────────────────────────────────────────────────────────
			toast.success(
				<div>
					<strong>Consultation Booked! 🎉</strong>
					<br />
					<span>
						We'll contact you within 24 hours to confirm your appointment.
					</span>
				</div>,
				toastConfig,
			)

			if (!result.success) {
				console.warn(
					"Form submitted but Google Sheets save failed — check backend logs.",
				)
			}

			// Reset everything
			setFormData(initialForm)
			setFieldErrors({})
			setTouched({})
		} catch (error) {
			// Only genuine network failures or non-422/429 server errors reach here
			console.error("Consultation submit error:", error)
			toast.error(
				<div>
					<strong>Something went wrong</strong>
					<br />
					<span>Please try again or contact us at info@brionest.com</span>
				</div>,
				toastConfig,
			)
		} finally {
			setIsSubmitting(false)
		}
	}

	// ─── Helper components ─────────────────────────────────────────────────────

	// Shows red error text below a field
	const FieldError = ({ field }) =>
		fieldErrors[field] ? (
			<p
				role="alert"
				style={{
					color: "#EF4444",
					fontSize: "12px",
					marginTop: "4px",
					display: "flex",
					alignItems: "center",
					gap: "4px",
				}}
			>
				<span style={{ fontWeight: 500 }}>&#9888;</span>
				{fieldErrors[field]}
			</p>
		) : null

	// Returns border class — red if error, default if not
	const inputClass = (field) =>
		`${
			fieldErrors[field]
				? "border-red-400 focus:border-red-500"
				: "border-[#E8D5B5] focus:border-[#C9A961]"
		}`

	const selectClass = (field) =>
		`${
			fieldErrors[field]
				? "border-red-400 focus:border-red-500"
				: "border-[#E8D5B5] focus:border-[#C9A961]"
		}`

	// ─── Render ────────────────────────────────────────────────────────────────
	return (
		<section
			id="consultation"
			className="py-12 sm:py-20 bg-gradient-to-b from-[#FFF9F0] to-white"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12 sm:mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C3E50] mb-4">
						Book Your Free Consultation
					</h2>
					<p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
						One visit. Zero pressure. Complete clarity on transforming your home
						into a smart home.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-start">
					{/* Form */}
					<Card className="border-2 border-[#E8D5B5] bg-white shadow-xl">
						<CardHeader>
							<CardTitle className="text-xl sm:text-2xl text-[#2C3E50]">
								Schedule Your Visit
							</CardTitle>
							<CardDescription className="text-sm sm:text-base">
								Fill in your details and we'll get back to you within 24 hours
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form
								onSubmit={handleSubmit}
								noValidate
								className="space-y-4 sm:space-y-6"
							>
								<div className="space-y-2">
									<Label htmlFor="name" className="text-[#2C3E50]">
										<User className="h-4 w-4 inline mr-2" />
										Full Name <span style={{ color: "#EF4444" }}>*</span>
									</Label>
									<Input
										id="name"
										name="name"
										value={formData.name}
										onChange={handleChange}
										onBlur={handleBlur}
										placeholder="Enter your full name"
										className={inputClass("name")}
										aria-invalid={!!fieldErrors.name}
										aria-describedby={
											fieldErrors.name ? "name-error" : undefined
										}
									/>
									<FieldError field="name" />
								</div>

								<div className="space-y-2">
									<Label htmlFor="email" className="text-[#2C3E50]">
										<Mail className="h-4 w-4 inline mr-2" />
										Email Address <span style={{ color: "#EF4444" }}>*</span>
									</Label>
									<Input
										id="email"
										name="email"
										type="email"
										value={formData.email}
										onChange={handleChange}
										onBlur={handleBlur}
										placeholder="your.email@example.com"
										className={inputClass("email")}
										aria-invalid={!!fieldErrors.email}
									/>
									<FieldError field="email" />
								</div>

								<div className="space-y-2">
									<Label htmlFor="phone" className="text-[#2C3E50]">
										<Phone className="h-4 w-4 inline mr-2" />
										Phone Number <span style={{ color: "#EF4444" }}>*</span>
									</Label>
									<Input
										id="phone"
										name="phone"
										type="tel"
										value={formData.phone}
										onChange={handleChange}
										onBlur={handleBlur}
										placeholder="+91 XXXXX XXXXX"
										className={inputClass("phone")}
										aria-invalid={!!fieldErrors.phone}
									/>
									<FieldError field="phone" />
								</div>

								<div className="space-y-2">
									<Label htmlFor="customerType" className="text-[#2C3E50]">
										I am a <span style={{ color: "#EF4444" }}>*</span>
									</Label>
									<Select
										value={formData.customerType}
										onValueChange={(value) =>
											handleSelectChange("customerType", value)
										}
									>
										<SelectTrigger
											id="customerType"
											className={selectClass("customerType")}
											aria-invalid={!!fieldErrors.customerType}
										>
											<SelectValue placeholder="Select customer type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="homeowner">Homeowner</SelectItem>
											<SelectItem value="builder">Builder/Developer</SelectItem>
											<SelectItem value="referral">Referral Partner</SelectItem>
										</SelectContent>
									</Select>
									<FieldError field="customerType" />
								</div>

								<div className="space-y-2">
									<Label htmlFor="propertyType" className="text-[#2C3E50]">
										<Building2 className="h-4 w-4 inline mr-2" />
										Property Type
									</Label>
									<Select
										value={formData.propertyType}
										onValueChange={(value) =>
											handleSelectChange("propertyType", value)
										}
									>
										<SelectTrigger className="border-[#E8D5B5] focus:border-[#C9A961]">
											<SelectValue placeholder="Select property type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="apartment">Apartment</SelectItem>
											<SelectItem value="villa">Independent Villa</SelectItem>
											<SelectItem value="builder-project">
												Builder Project
											</SelectItem>
											<SelectItem value="office">Office Space</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label htmlFor="preferredDate" className="text-[#2C3E50]">
										<Calendar className="h-4 w-4 inline mr-2" />
										Preferred Date
									</Label>
									<Input
										id="preferredDate"
										name="preferredDate"
										type="date"
										value={formData.preferredDate}
										onChange={handleChange}
										min={new Date().toISOString().split("T")[0]}
										className="border-[#E8D5B5] focus:border-[#C9A961]"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="message" className="text-[#2C3E50]">
										<MessageSquare className="h-4 w-4 inline mr-2" />
										Additional Details
									</Label>
									<Textarea
										id="message"
										name="message"
										value={formData.message}
										onChange={handleChange}
										placeholder="Tell us about your requirements..."
										rows={4}
										className="border-[#E8D5B5] focus:border-[#C9A961]"
									/>
								</div>

								<Button
									type="submit"
									className="w-full bg-[#C9A961] hover:bg-[#B89851] text-white text-base sm:text-lg py-5 sm:py-6"
									disabled={isSubmitting}
								>
									{isSubmitting ? "Booking..." : "Book Free Consultation"}
								</Button>
							</form>
						</CardContent>
					</Card>

					{/* Info Cards */}
					<div className="space-y-4 sm:space-y-6">
						<Card className="border-2 border-[#E8D5B5] bg-gradient-to-br from-[#C9A961]/10 to-[#F4E4C1]/20">
							<CardContent className="p-4 sm:p-6">
								<h3 className="text-lg sm:text-xl font-bold text-[#2C3E50] mb-4">
									What to Expect
								</h3>
								<ul className="space-y-2 sm:space-y-3">
									{[
										"Free home assessment by our experts",
										"Customized smart home plan for your needs",
										"Transparent pricing with no hidden costs",
										"Live demonstration of products",
										"Answer all your questions",
										"No obligation to purchase",
									].map((item, idx) => (
										<li key={idx} className="flex items-start">
											<div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#C9A961] flex items-center justify-center mr-2 sm:mr-3 mt-0.5 flex-shrink-0">
												<div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white"></div>
											</div>
											<span className="text-sm sm:text-base text-gray-700">
												{item}
											</span>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>

						<Card className="border-2 border-[#E8D5B5] bg-gradient-to-br from-[#5B7C99]/10 to-[#4A6B84]/10">
							<CardContent className="p-4 sm:p-6">
								<h3 className="text-lg sm:text-xl font-bold text-[#2C3E50] mb-4">
									Contact Us
								</h3>
								<div className="space-y-3 sm:space-y-4">
									<div className="flex items-start">
										<Phone className="h-4 w-4 sm:h-5 sm:w-5 text-[#5B7C99] mr-2 sm:mr-3 mt-1" />
										<div>
											<div className="font-semibold text-sm sm:text-base text-[#2C3E50]">
												Phone
											</div>
											<div className="text-sm sm:text-base text-gray-700">
												+91 98335 74794
											</div>
										</div>
									</div>
									<div className="flex items-start">
										<Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[#5B7C99] mr-2 sm:mr-3 mt-1" />
										<div>
											<div className="font-semibold text-sm sm:text-base text-[#2C3E50]">
												Email
											</div>
											<div className="text-sm sm:text-base text-gray-700">
												info@brionest.com
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ConsultationForm
