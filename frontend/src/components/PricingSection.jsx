import React from "react"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Check, Star, ArrowRight } from "lucide-react"

const PricingSection = ({ scrollToConsultation, userType }) => {
	const customerPackages = [
		{
			name: "Basic Smart",
			price: "₹20,000",
			description: "Perfect for starting your smart home journey",
			features: [
				"5 Smart Switches",
				"2 Smart Plugs",
				"Mobile App Control",
				"Alexa & Google Support",
				"Basic Automation",
				"Free Installation",
				"1 Year Support",
			],
			popular: false,
			color: "#5B7C99",
		},
		{
			name: "Smart Energy",
			price: "₹45,000",
			description: "Optimize energy consumption and save money",
			features: [
				"10 Smart Switches",
				"4 Smart Plugs",
				"3 Motion Sensors",
				"Energy Monitoring Dashboard",
				"Advanced Scheduling",
				"Gas Leak Detector",
				"Free Installation & Setup",
				"1 Year Priority Support",
			],
			popular: true,
			color: "#C9A961",
		},
		{
			name: "Whole Home",
			price: "₹80,000",
			description: "Complete home automation with security",
			features: [
				"Unlimited Smart Switches",
				"8 Smart Plugs",
				"5 Motion Sensors",
				"Smart Security Cameras (2)",
				"Smart Door Lock",
				"Video Doorbell",
				"Central Smart Hub",
				"Gas & Smoke Detectors",
				"Complete Automation",
				"Free Installation & Training",
				"2 Years Premium Support",
			],
			popular: false,
			color: "#4A6B84",
		},
	]

	const builderPackages = [
		{
			name: "Smart Ready",
			price: "Per Unit Pricing",
			description:
				"Basic smart home infrastructure integrated during construction",
			features: [
				"Smart wiring preparation",
				"App-controlled light switches",
				"Fan regulators with mobile control",
				"Voice assistant ready",
				"Basic automation setup",
				"Buyer demo & training",
				"Zero effort for builder team",
			],
			popular: false,
			color: "#5B7C99",
		},
		{
			name: "Smart Premium",
			price: "Custom Quote",
			description: "Enhanced smart features to command premium pricing",
			features: [
				"Everything in Smart Ready",
				"Motion sensors for automation",
				"Energy monitoring system",
				"Gas leak detection",
				"Advanced scheduling",
				"Intrusion detection",
				"Buyer consultation service",
				"Complete project support",
			],
			popular: true,
			color: "#C9A961",
		},
		{
			name: "Smart Luxury",
			price: "Custom Quote",
			description: "Complete smart home solution for premium projects",
			features: [
				"Everything in Smart Premium",
				"Security cameras integration",
				"Smart door locks",
				"Video doorbell systems",
				"Whole-home automation",
				"Community-wide integration",
				"Dedicated project manager",
				"Premium buyer experience",
				"24/7 technical support",
			],
			popular: false,
			color: "#4A6B84",
		},
	]

	const packages = userType === "customer" ? customerPackages : builderPackages
	const sectionTitle =
		userType === "customer"
			? "Smart Home Packages"
			: "Builder Integration Packages"
	const sectionSubtitle =
		userType === "customer"
			? "Choose the perfect package for your home. All packages include free installation and support"
			: "Flexible integration options designed for builders. From basic smart-ready to luxury automation"

	return (
		<section
			id="pricing"
			className="py-12 sm:py-20 bg-gradient-to-b from-white to-[#FFF9F0]"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12 sm:mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C3E50] mb-4">
						{sectionTitle}
					</h2>
					<p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
						{sectionSubtitle}
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
					{packages.map((pkg, index) => (
						<Card
							key={index}
							className={`relative border-2 transition-all duration-300 hover:shadow-2xl ${
								pkg.popular
									? "border-[#C9A961] shadow-xl md:scale-105 bg-gradient-to-br from-white to-[#F4E4C1]/20"
									: "border-[#E8D5B5] hover:border-[#C9A961] bg-white"
							}`}
						>
							{pkg.popular && (
								<div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
									<Badge className="bg-[#C9A961] text-white px-3 sm:px-4 py-1 text-xs sm:text-sm">
										<Star className="h-3 w-3 inline mr-1" />
										Most Popular
									</Badge>
								</div>
							)}

							<CardHeader className="text-center pb-6 sm:pb-8">
								<CardTitle className="text-xl sm:text-2xl text-[#2C3E50] mb-2">
									{pkg.name}
								</CardTitle>
								<CardDescription className="text-sm sm:text-base mb-4">
									{pkg.description}
								</CardDescription>
								<div className="mt-4">
									<div
										className="text-3xl sm:text-5xl font-bold"
										style={{ color: pkg.color }}
									>
										{pkg.price}
									</div>
									{userType === "customer" && (
										<div className="text-xs sm:text-sm text-gray-600 mt-2">
											One-time payment
										</div>
									)}
									{userType === "builder" &&
										pkg.price !== "Per Unit Pricing" && (
											<div className="text-xs sm:text-sm text-gray-600 mt-2">
												Based on project size
											</div>
										)}
								</div>
							</CardHeader>

							<CardContent>
								<ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
									{pkg.features.map((feature, idx) => (
										<li key={idx} className="flex items-start">
											<div
												className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center mr-2 sm:mr-3 mt-0.5 flex-shrink-0"
												style={{ backgroundColor: `${pkg.color}20` }}
											>
												<Check
													className="h-2.5 w-2.5 sm:h-3 sm:w-3"
													style={{ color: pkg.color }}
												/>
											</div>
											<span className="text-sm sm:text-base text-gray-700">
												{feature}
											</span>
										</li>
									))}
								</ul>

								<Button
									onClick={scrollToConsultation}
									className={`w-full text-white group text-sm sm:text-base ${
										pkg.popular
											? "bg-[#C9A961] hover:bg-[#B89851]"
											: "bg-[#5B7C99] hover:bg-[#4A6B84]"
									}`}
								>
									{userType === "customer" ? "Get Started" : "Request Quote"}
									<ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
								</Button>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="mt-12 sm:mt-16 text-center">
					<Card className="border-2 border-[#E8D5B5] bg-gradient-to-r from-[#F4E4C1]/30 to-[#FFF9F0] max-w-4xl mx-auto">
						<CardContent className="p-6 sm:p-8">
							<h3 className="text-xl sm:text-2xl font-bold text-[#2C3E50] mb-4">
								{userType === "customer"
									? "Need a Custom Solution?"
									: "Planning a Large Project?"}
							</h3>
							<p className="text-sm sm:text-base text-gray-700 mb-6">
								{userType === "customer"
									? "Every home is unique. We offer customized packages tailored to your specific needs and budget. Book a free consultation to discuss your requirements."
									: "For projects with 50+ units or custom requirements, we offer dedicated project management and customized solutions. Contact us for detailed project planning."}
							</p>
							<Button
								onClick={scrollToConsultation}
								size="lg"
								className="bg-[#C9A961] hover:bg-[#B89851] text-white w-full sm:w-auto"
							>
								{userType === "customer"
									? "Schedule Free Consultation"
									: "Discuss Your Project"}
								<ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	)
}

export default PricingSection
