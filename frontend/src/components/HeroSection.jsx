import React from "react"
import { Button } from "./ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

const HeroSection = ({ scrollToConsultation, userType }) => {
	const customerContent = {
		badge: "Smart Solutions for Modern Indian Homes",
		title: "Make Your Home",
		subtitle1: "Smarter, Safer",
		subtitle2: "& Save Electricity Every Month",
		description:
			"Transform your living space with intelligent automation starting from just ₹20,000. Control your home from anywhere, save on electricity bills, and protect your family with cutting-edge smart home technology.",
		stats: [
			{ value: "₹20,000", label: "Starting Price" },
			{ value: "₹300-1,200", label: "Monthly Savings" },
			{ value: "24/7", label: "Smart Control" },
		],
	}

	const builderContent = {
		badge: "Smart Home Solutions for Real Estate Developers",
		title: "Deliver",
		subtitle1: "Smart Ready Homes",
		subtitle2: "Stand Out in the Market",
		description:
			"Enhance property value and accelerate sales with integrated smart home solutions. Offer buyers modern homes with automation, safety features, and energy efficiency built right in.",
		stats: [
			{ value: "20-30%", label: "Faster Sales" },
			{ value: "5-8%", label: "Higher Valuation" },
			{ value: "Zero", label: "Operational Effort" },
		],
	}

	const content = userType === "customer" ? customerContent : builderContent

	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
			{/* Background Image with Overlay */}
			<div className="absolute inset-0 z-0">
				<img
					src={
						userType === "customer"
							? "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=1920&q=80"
							: "https://images.unsplash.com/photo-1556597249-cd6a997737df?w=1920&q=80"
					}
					alt="Modern Smart Home"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-[#1a2332]/95 via-[#1a2332]/85 to-[#1a2332]/70"></div>
			</div>

			{/* Content */}
			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
				<div className="max-w-3xl">
					<div className="inline-flex items-center space-x-2 bg-[#F4E4C1]/20 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6 animate-fade-in">
						<Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-[#C9A961]" />
						<span className="text-[#F4E4C1] font-medium text-xs sm:text-sm">
							{content.badge}
						</span>
					</div>

					<h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight animate-slide-up">
						{content.title}
						<span className="block text-[#F4E4C1]">{content.subtitle1}</span>
						<span className="block text-[#C9A961]">{content.subtitle2}</span>
					</h1>

					<p className="text-base sm:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed animate-slide-up-delay">
						{content.description}
					</p>

					<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-slide-up-delay-2">
						<Button
							size="lg"
							onClick={scrollToConsultation}
							className="bg-[#C9A961] hover:bg-[#B89851] text-white text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 group w-full sm:w-auto"
						>
							Book Free Consultation
							<ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="border-2 border-white text-white hover:bg-white/10 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 backdrop-blur-sm w-full sm:w-auto"
							onClick={() =>
								document
									.getElementById("products")
									.scrollIntoView({ behavior: "smooth" })
							}
						>
							Explore Products
						</Button>
					</div>

					{/* Quick Stats */}
					<div className="grid grid-cols-3 gap-3 sm:gap-6 mt-12 sm:mt-16 animate-fade-in-delay">
						{content.stats.map((stat, idx) => (
							<div key={idx} className="text-center">
								<div className="text-2xl sm:text-4xl font-bold text-[#C9A961] mb-1 sm:mb-2">
									{stat.value}
								</div>
								<div className="text-xs sm:text-sm text-gray-200">
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Decorative Elements */}
			<div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-[#FFF9F0] to-transparent z-10"></div>
		</section>
	)
}

export default HeroSection
