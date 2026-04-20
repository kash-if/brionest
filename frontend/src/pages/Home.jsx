import React, { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Users, Building2 } from "lucide-react"
import HeroSection from "../components/HeroSection"
import ProductCatalogue from "../components/ProductCatalogue"
import RealExamples from "../components/RealExamples"
import BenefitsSection from "../components/BenefitsSection"
import PricingSection from "../components/PricingSection"
import ConsultationForm from "../components/ConsultationForm"
import Footer from "../components/Footer"
import HomeIcon from "../assets/Brionest_logo_orange.png"
import { ToastContainer, Bounce } from "react-toastify"

const Home = () => {
	const [activeSection, setActiveSection] = useState("")
	const [userType, setUserType] = useState("customer") // 'customer' or 'builder'

	useEffect(() => {
		const handleScroll = () => {
			const sections = document.querySelectorAll("section[id]")
			let current = ""

			sections.forEach((section) => {
				const sectionTop = section.offsetTop
				const sectionHeight = section.clientHeight
				if (window.pageYOffset >= sectionTop - 200) {
					current = section.getAttribute("id")
				}
			})

			setActiveSection(current)
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	const scrollToSection = (sectionId) => {
		const element = document.getElementById(sectionId)
		if (element) {
			element.scrollIntoView({ behavior: "smooth" })
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-[#FFF9F0] to-[#FAF6F1]">
			{/* Navigation */}
			<nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-[#E8D5B5]">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col sm:flex-row justify-between items-center py-3 sm:py-0 sm:h-16 gap-3 sm:gap-0">
						<div className="flex items-center space-x-1">
							<img
								src={HomeIcon}
								className="h-6 w-6 sm:h-8 sm:w-8 text-[#C9A961]"
							/>
							<span className="text-lg sm:text-2xl font-bold text-[#C9A961]">
								BrioNest Solutions
							</span>
						</div>

						{/* User Type Toggle */}
						<div className="flex items-center space-x-1 sm:space-x-2 bg-[#F4E4C1]/30 p-1 rounded-lg">
							<button
								onClick={() => setUserType("customer")}
								className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
									userType === "customer"
										? "bg-[#C9A961] text-white shadow-md"
										: "text-[#2C3E50] hover:bg-[#F4E4C1]"
								}`}
							>
								<Users className="h-3 w-3 sm:h-4 sm:w-4" />
								<span className="hidden xs:inline">For Customers</span>
								<span className="xs:hidden">Customers</span>
							</button>
							<button
								onClick={() => setUserType("builder")}
								className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
									userType === "builder"
										? "bg-[#C9A961] text-white shadow-md"
										: "text-[#2C3E50] hover:bg-[#F4E4C1]"
								}`}
							>
								<Building2 className="h-3 w-3 sm:h-4 sm:w-4" />
								<span className="hidden xs:inline">For Builders</span>
								<span className="xs:hidden">Builders</span>
							</button>
						</div>

						<Button
							onClick={() => scrollToSection("consultation")}
							className="bg-[#C9A961] hover:bg-[#B89851] text-white text-xs sm:text-sm px-3 sm:px-4 py-2"
						>
							<span className="hidden sm:inline">Book Consultation</span>
							<span className="sm:hidden">Book Now</span>
						</Button>
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<div className="pt-24 sm:pt-16">
				<HeroSection
					scrollToConsultation={() => scrollToSection("consultation")}
					userType={userType}
				/>
				<ProductCatalogue userType={userType} />
				<RealExamples userType={userType} />
				<BenefitsSection userType={userType} />
				{userType === "builder" ? (
					<PricingSection
						scrollToConsultation={() => scrollToSection("consultation")}
						userType={userType}
					/>
				) : null}
				<ConsultationForm userType={userType} />
				<Footer />
			</div>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
				transition={Bounce}
			/>
		</div>
	)
}

export default Home
