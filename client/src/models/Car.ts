export type Car = {
	car_id: number
	car_name: string
	ai_enabled: boolean
	allow_number_colors: boolean
	allow_number_font: boolean
	allow_sponsor_1: boolean
	allow_sponsor_2: boolean
	allow_wheel_color: boolean
	award_exempt: boolean
	car_dirpath: string
	car_name_abbreviated: string
	car_weight: number
	categories: string[]
	created: number
	first_sale: number
	forum_url: string
	free_with_subscription: boolean
	has_headlights: boolean
	has_multiple_dry_tire_types: boolean
	hp: number
	is_ps_purchasable: boolean
	max_power_adjust_pct: number
	max_weight_penalty_kg: number
	min_power_adjust_pct: number
	package_id: number
	patterns: number
	price: number
	price_display: string
	retired: boolean
	search_filters: string[]
	sku: number
	car_rules: Record<string, string>[]
	detail_copy: string
	detail_screen_shot_images: string[]
	detail_techspecs_copy: string
	folder: string
	gallery_prefix: string
	group_image: string
	group_name: string
	large_image: string
	logo: string
	small_image: string
	sponsor_logo: string
	template_path: string
	gallery_images: string
}