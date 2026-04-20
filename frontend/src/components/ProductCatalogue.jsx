import React from "react"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import {
	Lightbulb,
	Zap,
	Wifi,
	Camera,
	Lock,
	ThermometerSun,
	Plug,
	Radio,
	AlertTriangle,
} from "lucide-react"
import SmartSwitch from "../assets/smart_switch.jpg"
import MotionSensor from "../assets/motion_sensor.png"
import SmartPlug from "../assets/smart_plug.png"
import SmokeDetection from "../assets/smoke_detection.png"
import VideoDoorBell from "../assets/video_door_bell.png"
import CurtainOpener from "../assets/curtain_opener.png"
import IntrusionDetection from "../assets/intrusion_detection.png"

const ProductCatalogue = ({ userType }) => {
	const categories = [
		{
			id: "switches",
			name: "Smart Switches",
			products: [
				{
					icon: Lightbulb,
					name: "Smart Light Switch",
					description: "Control your lights from anywhere with app or voice",
					howItWorks:
						"Replaces traditional switches. Connect to Wi-Fi, control via mobile app or voice commands. Set schedules for automatic on/off.",
					image: SmartSwitch,
				},
				{
					icon: Zap,
					name: "Smart Fan Regulator",
					description: "Adjust fan speed remotely and set timers",
					howItWorks:
						"Replaces traditional fan regulators. Control 4 speed levels from your phone. Set timers for automatic shut-off.",
					image:
						"https://images.unsplash.com/photo-1729839206142-d03c98f921fd?w=400&q=80",
				},
				{
					icon: Plug,
					name: "Smart Power Socket",
					description: "Convert any appliance into a smart device",
					howItWorks:
						"Plug into existing socket, then plug your appliance. Monitor energy usage in real-time. Schedule on/off times.",
					image: SmartPlug,
				},
			],
		},
		{
			id: "sensors",
			name: "Sensors & Safety",
			products: [
				{
					icon: Radio,
					name: "Motion Sensor",
					description: "Detect movement and trigger automation",
					howItWorks:
						"360° motion detection. Place anywhere in room. Triggers lights, alarms, or sends alerts when movement detected.",
					image: MotionSensor,
				},
				{
					icon: AlertTriangle,
					name: "Smoke/Gas Leak Detector",
					description:
						"Instant alerts for smoke/gas leaks to protect your family",
					howItWorks:
						"Monitors air for smoke/gas leaks 24/7. Sends instant mobile alerts.",
					image: SmokeDetection,
				},
				{
					icon: AlertTriangle,
					name: "Intrusion Detector",
					description:
						"Instant alerts for instrutions to protect your family and valuables",
					howItWorks:
						"Tracks 24/7 for intrusions on doors and windows. Send instant mobile alerts.",
					image: IntrusionDetection,
				},
			],
		},
		{
			id: "security",
			name: "Security Devices",
			products: [
				{
					icon: Camera,
					name: "Smart Security Camera",
					description: "HD surveillance with night vision and motion detection",
					howItWorks:
						"1080p HD recording with night vision. Detects motion, sends alerts. Access live feed from phone anywhere.",
					image:
						"https://images.unsplash.com/photo-1558002038-1055907df827?w=400&q=80",
				},
				{
					icon: Lock,
					name: "Smart Door Lock",
					description: "Keyless entry with multiple access methods",
					howItWorks:
						"Unlock with fingerprint, PIN, RFID card, or phone. Grant temporary access to guests. Get entry/exit notifications.",
					image:
						"https://images.unsplash.com/photo-1494526585095-c41746248156?w=400&q=80",
				},
				{
					icon: Camera,
					name: "Video Doorbell",
					description: "See and speak to visitors from your phone",
					howItWorks:
						"HD video doorbell with two-way audio. See visitors before opening door. Records all activity.",
					image: VideoDoorBell,
				},
			],
		},
		{
			id: "hubs",
			name: "Control Hubs",
			products: [
				{
					icon: Wifi,
					name: "Curtain Opener",
					description:
						"Control your curtains from anywhere with app, voice and timers",
					howItWorks:
						"This smart curtain robot allows you to control your curtains remotely. Set automatic opening and closing times via the mobile app to align with your daily routines.",
					image: CurtainOpener,
				},
				{
					icon: Radio,
					name: "IR Universal Remote",
					description: "Control all IR devices from one app",
					howItWorks:
						"Learns IR codes from existing remotes. Control TV, AC, set-top box from phone. Voice control enabled.",
					image:
						"https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=400&q=80",
				},
			],
		},
	]

	return (
		<section
			id="products"
			className="py-12 sm:py-20 bg-gradient-to-b from-white to-[#FFF9F0]"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12 sm:mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C3E50] mb-4">
						Product Catalogue
					</h2>
					<p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
						Explore our comprehensive range of smart home devices designed for
						modern Indian homes
					</p>
				</div>

				<Tabs defaultValue="switches" className="w-full">
					<TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-6 sm:mb-8 bg-[#F4E4C1]/30 p-1">
						{categories.map((category) => (
							<TabsTrigger
								key={category.id}
								value={category.id}
								className="data-[state=active]:bg-[#C9A961] data-[state=active]:text-white text-xs sm:text-sm"
							>
								{category.name}
							</TabsTrigger>
						))}
					</TabsList>

					{categories.map((category) => (
						<TabsContent key={category.id} value={category.id}>
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
								{category.products.map((product, index) => {
									const Icon = product.icon
									return (
										<Card
											key={index}
											className="border-2 border-[#E8D5B5] hover:border-[#C9A961] transition-all duration-300 hover:shadow-lg overflow-hidden group"
										>
											<div className="relative h-48 overflow-hidden bg-[#F4E4C1]/20">
												<img
													src={product.image}
													alt={product.name}
													className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
												/>
											</div>
											<CardHeader>
												<div className="flex items-center space-x-3 mb-2">
													<div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#C9A961]/20 flex items-center justify-center">
														<Icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#C9A961]" />
													</div>
													<CardTitle className="text-lg sm:text-xl text-[#2C3E50]">
														{product.name}
													</CardTitle>
												</div>
												<CardDescription className="text-sm sm:text-base">
													{product.description}
												</CardDescription>
											</CardHeader>
											<CardContent>
												<div className="bg-[#F4E4C1]/30 p-3 sm:p-4 rounded-lg">
													<div className="text-xs sm:text-sm font-semibold text-[#C9A961] mb-2">
														How It Works:
													</div>
													<p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
														{product.howItWorks}
													</p>
												</div>
											</CardContent>
										</Card>
									)
								})}
							</div>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</section>
	)
}

export default ProductCatalogue
