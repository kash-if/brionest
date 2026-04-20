import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import {
	Zap,
	Shield,
	Smartphone,
	TrendingUp,
	Clock,
	Leaf,
	Building2,
	Users,
	Award,
} from "lucide-react"

const BenefitsSection = ({ userType }) => {
	const customerBenefits = [
		{
			icon: Zap,
			title: "Save on Electricity",
			description:
				"Reduce your monthly electricity bills by up to 30% with smart scheduling and energy monitoring",
			stats: "Average savings: ₹300-1,200/month",
			color: "#C9A961",
		},
		{
			icon: Shield,
			title: "Enhanced Safety",
			description:
				"Protect your family with gas leak alerts, motion detection, and real-time security monitoring",
			stats: "24/7 automated monitoring",
			color: "#4A6B84",
		},
		{
			icon: Smartphone,
			title: "Control from Anywhere",
			description:
				"Manage your entire home from your smartphone - lights, appliances, security, and more",
			stats: "Works from anywhere in the world",
			color: "#C9A961",
		},
		{
			icon: Clock,
			title: "Save Time",
			description:
				"Automate daily routines and eliminate repetitive tasks with intelligent scheduling",
			stats: "Save 1-2 hours daily",
			color: "#4A6B84",
		},
		{
			icon: Leaf,
			title: "Eco-Friendly Living",
			description:
				"Reduce your carbon footprint with optimized energy consumption and smart resource management",
			stats: "Reduce CO₂ emissions by 25%",
			color: "#C9A961",
		},
		{
			icon: Award,
			title: "Premium Aesthetics",
			description:
				"Glass touch panels and modern switches that enhance your home's interior design and impress guests",
			stats: "Stunning visual upgrade",
			color: "#4A6B84",
		},
	]

	const builderBenefits = [
		{
			icon: TrendingUp,
			title: "Faster Project Sales",
			description:
				"Properties with smart home features sell 20-30% faster, helping you achieve quicker project completion and faster capital turnover",
			stats: "20-30% faster sales",
			color: "#C9A961",
		},
		{
			icon: Award,
			title: "Higher Property Valuation",
			description:
				"Smart-ready homes command 5-8% premium pricing over comparable traditional properties in the same area",
			stats: "5-8% higher prices",
			color: "#4A6B84",
		},
		{
			icon: Users,
			title: "Competitive Advantage",
			description:
				"Stand out in crowded markets. Modern buyers actively seek smart-ready homes, giving you an edge over competitors",
			stats: "Unique market positioning",
			color: "#C9A961",
		},
		{
			icon: Building2,
			title: "Zero Operational Effort",
			description:
				"We handle everything - from planning to installation to buyer support. No additional workload for your team",
			stats: "Complete turnkey solution",
			color: "#4A6B84",
		},
		{
			icon: Smartphone,
			title: "Modern Buyer Expectations",
			description:
				"Today's homebuyers expect smart features. Deliver what the market demands and avoid losing customers to competitors",
			stats: "Meet market expectations",
			color: "#C9A961",
		},
		{
			icon: Leaf,
			title: "Green Building Credits",
			description:
				"Smart energy management features can contribute to green building certifications and sustainability goals",
			stats: "LEED/IGBC compatible",
			color: "#4A6B84",
		},
	]

	const benefits = userType === "customer" ? customerBenefits : builderBenefits
	const sectionTitle =
		userType === "customer"
			? "Why Choose BrioNest?"
			: "Why Builders Choose BrioNest"
	const sectionSubtitle =
		userType === "customer"
			? "Experience the transformative benefits of smart home automation"
			: "Transform your properties into smart-ready homes that sell faster and command premium prices"

	return (
		<section className="py-12 sm:py-20 bg-gradient-to-b from-[#FFF9F0] to-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12 sm:mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C3E50] mb-4">
						{sectionTitle}
					</h2>
					<p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
						{sectionSubtitle}
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
					{benefits.map((benefit, index) => {
						const Icon = benefit.icon
						return (
							<Card
								key={index}
								className="border-2 border-[#E8D5B5] hover:border-[#C9A961] transition-all duration-300 hover:shadow-xl group bg-white"
							>
								<CardHeader>
									<div
										className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
										style={{ backgroundColor: `${benefit.color}20` }}
									>
										<Icon
											className="h-6 w-6 sm:h-8 sm:w-8"
											style={{ color: benefit.color }}
										/>
									</div>
									<CardTitle className="text-lg sm:text-xl text-[#2C3E50] mb-2">
										{benefit.title}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
										{benefit.description}
									</p>
									<div
										className="inline-block px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold"
										style={{
											backgroundColor: `${benefit.color}15`,
											color: benefit.color,
										}}
									>
										{benefit.stats}
									</div>
								</CardContent>
							</Card>
						)
					})}
				</div>
			</div>
		</section>
	)
}

export default BenefitsSection
