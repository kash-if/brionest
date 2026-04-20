import React from "react"
import {
	Mail,
	Phone,
	MapPin,
	Facebook,
	Twitter,
	Instagram,
	Linkedin,
} from "lucide-react"
import HomeIcon from "../assets/Brionest_logo_orange.png"

const Footer = () => {
	const currentYear = new Date().getFullYear()

	return (
		<footer className="bg-[#2C3E50] text-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
					{/* Brand */}
					<div className="col-span-1">
						<div className="flex items-center space-x-2 mb-4">
							<img
								src={HomeIcon}
								className="h-6 w-6 sm:h-8 sm:w-8 text-[#C9A961]"
							/>
							<span className="text-lg sm:text-xl font-bold text-[#C9A961]">
								BrioNest Solutions
							</span>
						</div>
						<p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
							Transforming homes across India with intelligent automation
							solutions. Making your home smarter, safer, and more
							energy-efficient.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#C9A961]">
							Quick Links
						</h3>
						<ul className="space-y-2">
							{["Services", "Products", "Pricing", "About Us", "Contact"].map(
								(link) => (
									<li key={link}>
										<a
											href={`#${link.toLowerCase().replace(" ", "-")}`}
											className="text-gray-400 hover:text-[#C9A961] transition-colors text-xs sm:text-sm"
										>
											{link}
										</a>
									</li>
								),
							)}
						</ul>
					</div>

					{/* Services */}
					<div>
						<h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#C9A961]">
							Our Services
						</h3>
						<ul className="space-y-2">
							{[
								"For Builders",
								"For Homeowners",
								"Referral Program",
								"Installation",
								"Support",
							].map((service) => (
								<li key={service}>
									<span className="text-gray-400 text-xs sm:text-sm">
										{service}
									</span>
								</li>
							))}
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#C9A961]">
							Get in Touch
						</h3>
						<ul className="space-y-2 sm:space-y-3">
							<li className="flex items-start">
								<Phone className="h-3 w-3 sm:h-4 sm:w-4 text-[#C9A961] mr-2 mt-1 flex-shrink-0" />
								<span className="text-gray-400 text-xs sm:text-sm">
									+91 98335 74794
								</span>
							</li>
							<li className="flex items-start">
								<Mail className="h-3 w-3 sm:h-4 sm:w-4 text-[#C9A961] mr-2 mt-1 flex-shrink-0" />
								<span className="text-gray-400 text-xs sm:text-sm">
									info@brionest.com
								</span>
							</li>
							<li className="flex items-start">
								<MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-[#C9A961] mr-2 mt-1 flex-shrink-0" />
								<span className="text-gray-400 text-xs sm:text-sm">
									Serving major cities across India
								</span>
							</li>
						</ul>

						{/* Social Media */}
						<div className="flex space-x-3 sm:space-x-4 mt-4 sm:mt-6">
							{[
								{ icon: Facebook, href: "#" },
								{ icon: Twitter, href: "#" },
								{ icon: Instagram, href: "#" },
								{ icon: Linkedin, href: "#" },
							].map((social, idx) => {
								const Icon = social.icon
								return (
									<a
										key={idx}
										href={social.href}
										className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#C9A961]/20 flex items-center justify-center hover:bg-[#C9A961] transition-colors"
									>
										<Icon className="h-3 w-3 sm:h-4 sm:w-4 text-[#C9A961] hover:text-white" />
									</a>
								)
							})}
						</div>
					</div>
				</div>

				<div className="border-t border-gray-700 mt-8 sm:mt-12 pt-6 sm:pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
							© {currentYear} BrioNest Solutions. All rights reserved.
						</p>
						<div className="flex flex-wrap justify-center gap-4 sm:gap-6">
							<a
								href="#"
								className="text-gray-400 hover:text-[#C9A961] text-xs sm:text-sm transition-colors"
							>
								Privacy Policy
							</a>
							<a
								href="#"
								className="text-gray-400 hover:text-[#C9A961] text-xs sm:text-sm transition-colors"
							>
								Terms of Service
							</a>
							<a
								href="#"
								className="text-gray-400 hover:text-[#C9A961] text-xs sm:text-sm transition-colors"
							>
								Cookie Policy
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
