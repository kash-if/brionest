import React from "react"
import { Card, CardContent } from "./ui/card"

const RealExamples = ({ userType }) => {
	const customerExamples = [
		{
			title: "Living Room & Kitchen - Aesthetic + Convenience Control",
			description:
				"\"I control every light in my 3BHK from my phone — even when I'm at my sister's place in Pune! The glass touch panels look absolutely stunning in my living room. My guests always ask about them.\"",
			scenario:
				"Remote control of lights & appliances from anywhere. Premium glass touch panels that upgrade your interior aesthetics. Turned off forgotten AC from office — saved the electricity bill! Perfect for interior-focused homeowners who want both beauty and convenience.",
			image:
				"https://images.unsplash.com/photo-1556597249-cd6a997737df?w=600&q=80",
			character: "Living Room & Kitchen",
			savings: "Aesthetic + Energy Savings",
			color: "#5B7C99",
		},
		{
			title: "Bedroom & Bathroom - Automation + Comfort Lifestyle",
			description:
				'"As a techie, I was skeptical. But the setup took 15 minutes and the app is buttery smooth. I\'ve automated my morning routine — lights on, geyser on, fan off — all before I even get out of bed."',
			scenario:
				"Scheduled geyser every morning at 6 AM. Never a cold shower again. Automated morning routines save time and effort. Fast 15-minute installation with reliable app experience. Perfect for busy working professionals who want effortless living.",
			image:
				"https://images.unsplash.com/photo-1556597249-cd6a997737df?w=600&q=80",
			character: "Bedroom & Bathroom",
			savings: "Time-Saving Automation",
			color: "#C9A961",
		},
		{
			title: "Whole Home - Security + Remote Access + Peace of Mind",
			description:
				'"We travel frequently for work. Earlier we\'d worry about lights left on. Now we check and control everything from the airport. The schedule feature for Diwali lighting was a game changer!"',
			scenario:
				"Set festive lighting schedules for Diwali from Dubai! Control entire home remotely from anywhere in the world. No more worrying about forgotten lights or devices. Perfect for frequent travelers and NRI property owners.",
			image:
				"https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=600&q=80",
			character: "Whole Home Control",
			savings: "Freedom + Safety",
			color: "#4A6B84",
		},
	]

	const builderExamples = [
		{
			title: "Sara Residency - Navi Mumbai",
			description:
				"Sara Builders & Developers integrated BrioNest smart home solutions in their premium luxury 3 BHK Flats apartment.",
			scenario:
				"Every apartment came pre-installed with basic smart features - app-controlled lights, fans, and security integration. 60% of buyers opted for advanced packages during booking, generating additional revenue.",
			image:
				"https://images.unsplash.com/photo-1556597249-cd6a997737df?w=600&q=80",
			character: "Sara Builders & Developers",
			savings: "25% faster sales completion",
			color: "#5B7C99",
		},
		// {
		//   title: 'Premium Township - Bangalore',
		//   description: 'Prestige Constructions integrated BrioNest smart home solutions in their 200-unit premium township project.',
		//   scenario: 'Every apartment came pre-installed with basic smart features - app-controlled lights, fans, and security integration. 60% of buyers opted for advanced packages during booking, generating additional revenue.',
		//   image: 'https://images.unsplash.com/photo-1556597249-cd6a997737df?w=600&q=80',
		//   character: 'Prestige Constructions',
		//   savings: '25% faster sales completion',
		//   color: '#5B7C99'
		// },
		// {
		//   title: 'Luxury Villas - Pune',
		//   description: 'Godrej Properties differentiated their luxury villa project with fully integrated smart home automation.',
		//   scenario: 'Smart home features became the key selling point. Properties commanded 8% premium over comparable projects. Buyers appreciated move-in ready smart homes with professional setup.',
		//   image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=600&q=80',
		//   character: 'Godrej Properties',
		//   savings: '8% higher property valuation',
		//   color: '#C9A961'
		// },
		// {
		//   title: 'Mid-Segment Apartments - Hyderabad',
		//   description: 'Local builder ABC Developers added smart home ready infrastructure to their mid-segment project.',
		//   scenario: 'Pre-wired for smart devices during construction. Offered buyers choice to activate smart features. Zero additional construction effort. Became unique selling proposition in competitive market.',
		//   image: 'https://images.unsplash.com/photo-1556597249-cd6a997737df?w=600&q=80',
		//   character: 'ABC Developers',
		//   savings: 'Zero operational effort',
		//   color: '#4A6B84'
		// },
		// {
		//   title: 'Gated Community - Mumbai',
		//   description: 'Peninsula Land integrated community-wide smart solutions with individual apartment automation.',
		//   scenario: 'Common area automation + individual apartment smart features. Centralized security monitoring. Energy management across entire complex. Positioned as India\'s first smart gated community.',
		//   image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=600&q=80',
		//   character: 'Peninsula Land',
		//   savings: '30% faster project sellout',
		//   color: '#C9A961'
		// }
	]

	const examples = userType === "customer" ? customerExamples : builderExamples
	const sectionTitle =
		userType === "customer"
			? "Real-Life Smart Home Stories"
			: "Builder Success Stories"
	const sectionSubtitle =
		userType === "customer"
			? "See how families across India are transforming their homes with BrioNest Solutions"
			: "See how leading builders are enhancing property value and accelerating sales"

	return (
		<section id="examples" className="py-12 sm:py-20 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12 sm:mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C3E50] mb-4">
						{sectionTitle}
					</h2>
					<p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
						{sectionSubtitle}
					</p>
				</div>

				<div className="space-y-12 sm:space-y-16">
					{examples.map((example, index) => (
						<div
							key={index}
							className={`flex flex-col gap-6 sm:gap-8 items-center
    md:flex-row ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
						>
							{/* Image Side */}
							<div className="w-full md:w-1/2">
								<div className="relative rounded-2xl overflow-hidden shadow-xl group">
									<img
										src={example.image}
										alt={example.title}
										className="w-full h-64 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
									<div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
										<div className="flex items-center space-x-2 sm:space-x-3 mb-2">
											<div
												className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl"
												style={{ backgroundColor: example.color }}
											>
												{example.character.charAt(0)}
											</div>
											<div>
												<div className="text-white font-semibold text-sm sm:text-base">
													{example.character}
												</div>
												<div className="text-[#F4E4C1] text-xs sm:text-sm">
													{example.savings}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Content Side */}
							<div className="w-full md:w-1/2">
								<Card className="border-2 border-[#E8D5B5] bg-gradient-to-br from-white to-[#FFF9F0]">
									<CardContent className="p-4 sm:p-8">
										<div className="flex items-center mb-4">
											<div
												className="w-1.5 sm:w-2 h-10 sm:h-12 rounded-full mr-3 sm:mr-4"
												style={{ backgroundColor: example.color }}
											></div>
											<h3 className="text-xl sm:text-2xl font-bold text-[#2C3E50]">
												{example.title}
											</h3>
										</div>

										<p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
											{example.description}
										</p>

										<div
											className="p-4 sm:p-6 rounded-xl mb-4"
											style={{ backgroundColor: `${example.color}10` }}
										>
											<div
												className="text-xs sm:text-sm font-semibold mb-2"
												style={{ color: example.color }}
											>
												{userType === "customer"
													? "How It Works:"
													: "Implementation:"}
											</div>
											<p className="text-sm sm:text-base text-gray-700 leading-relaxed">
												{example.scenario}
											</p>
										</div>

										<div className="flex flex-wrap gap-2">
											{userType === "customer"
												? ["Mobile Control", "Energy Saving", "Automated"].map(
														(tag, idx) => (
															<span
																key={idx}
																className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
																style={{
																	backgroundColor: `${example.color}20`,
																	color: example.color,
																}}
															>
																{tag}
															</span>
														),
													)
												: ["Fast Sales", "Premium Value", "Zero Effort"].map(
														(tag, idx) => (
															<span
																key={idx}
																className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
																style={{
																	backgroundColor: `${example.color}20`,
																	color: example.color,
																}}
															>
																{tag}
															</span>
														),
													)}
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default RealExamples
