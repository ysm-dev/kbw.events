import { memoize } from "@fxts/core"
import { hopFetch } from "scripts/fn/hopFetch"

const getLumaInfo = async (id: string, retry = 0): Promise<Data | null> => {
  const url = `https://api.lu.ma/url?url=${id}`
  const res = await (retry === 0 ? fetch(url) : hopFetch(url))

  // retry on 429
  if (res.status === 429) {
    console.log(`${id} retrying... ${retry}`)
    return await getLumaInfo(id, 1)
  }

  if (!res.ok) {
    console.log(`${id} not found`)
    return null
  }

  const json: R = await res.json()

  return json.data
}

export const getMemoizedLumaInfo = memoize(getLumaInfo)

export interface R {
  kind: string
  data: Data
}

export interface Data {
  api_id: string
  calendar: Calendar
  fb_pixel_id: null
  google_measurement_id: null
  farcaster_frame_enabled: boolean
  stripe_account_id: null
  payment_methods: any[]
  event: Event
  start_at: Date
  guest_data: GuestData
  featured_guests: any[]
  refund_policy: null
  guest_count: number
  ticket_count: number
  hosts: Host[]
  referred_by: null
  cover_image: CoverImage
  sessions: any[]
  ticket_types: TicketType[]
  featured_info: FeaturedInfo
  ticket_info: TicketInfo
  subscribed_to_calendar: boolean
  event_invite: null
  role: null
  sold_out: boolean
  locale: string
  series_info: SeriesInfo
  theme_meta: ThemeMeta
  tint_color: string
  crypto_token_requirements: any[]
  can_register_for_multiple_tickets: boolean
  font_title: null
  description_mirror: DescriptionMirror
  eth_address_requirement: null
  phone_number_requirement: null
  solana_address_requirement: null
  registration_questions: RegistrationQuestion[]
}

export interface Calendar {
  access_level: string
  api_id: string
  archived_at: null
  avatar_url: string
  cover_image_url: string
  description_short: null
  fb_pixel_id: null
  geo_city: null
  geo_country: null
  geo_latitude: null
  geo_longitude: null
  geo_region: null
  google_measurement_id: null
  instagram_handle: null
  linkedin_handle: null
  luma_plus_active: boolean
  name: string
  personal_user_api_id: string
  refund_policy: null
  slug: null
  social_image_url: null
  stripe_account_id: null
  tax_config: null
  team_api_id: null
  tiktok_handle: null
  timezone: null
  tint_color: string
  twitter_handle: null
  verified_at: Date
  website: null
  youtube_handle: null
  payment_methods: any[]
  charges_enabled: null
  is_personal: boolean
}

export interface CoverImage {
  vibrant_color: null
  colors: string[]
}

export interface DescriptionMirror {
  type: string
  content: DescriptionMirrorContent[]
}

export interface DescriptionMirrorContent {
  type: PurpleType
  attrs?: ContentAttrs
  content?: ContentContent[]
}

export interface ContentAttrs {
  level?: number
  alt?: null
  src?: string
  title?: null
  width?: number | null
  height?: number | null
  image_id?: null | string
  mime_type?: null
  uploaded_at?: Date | null
  is_uploading?: boolean
  resize_width?: null
}

export interface ContentContent {
  text?: string
  type: QuestionTypeEnum
  marks?: Mark[]
}

export interface Mark {
  type: MarkType
  attrs?: MarkAttrs
}

export interface MarkAttrs {
  href: string
}

export enum MarkType {
  Bold = "bold",
  Link = "link",
}

export enum QuestionTypeEnum {
  HardBreak = "hard_break",
  Text = "text",
}

export enum PurpleType {
  Heading = "heading",
  Image = "image",
  Paragraph = "paragraph",
}

export interface Event {
  api_id: string
  calendar_api_id: string
  cover_url: string
  end_at: Date
  event_type: string
  hide_rsvp: boolean
  location_type: string
  name: string
  one_to_one: boolean
  recurrence_id: null
  show_guest_list: boolean
  start_at: Date
  timezone: string
  url: string
  user_api_id: string
  visibility: string
  waitlist_enabled: boolean
  can_register_for_multiple_tickets: boolean
  duration_interval: string
  virtual_info: VirtualInfo
  geo_longitude: string
  geo_latitude: string
  geo_address_info: GeoAddressInfo
  geo_address_visibility: string
}

export interface GeoAddressInfo {
  city: null
  type: string
  region: string
  address: string
  country: string
  place_id: string
  city_state: string
  description: string
  full_address: string
  mode: string
}

export interface VirtualInfo {
  has_access: boolean
}

export interface FeaturedInfo {
  type: string
  avatar_url: string
  tint_color: string
  name: string
  name_raw: string
  path: string
}

export interface GuestData {
  ticket_key: null
  meeting_details: MeetingDetails
  approval_status: null
  proxy_key: null
  session_details: null
  event_tickets: any[]
  payments: any[]
}

export interface MeetingDetails {
  approval_status: null
  proxy_key: null
}

export interface Host {
  api_id: string
  avatar_url: string
  bio_short: null
  instagram_handle: null
  last_online_at: null
  linkedin_handle: null
  name: string
  tiktok_handle: null
  timezone: string
  twitter_handle: string
  username: null
  website: null
  youtube_handle: string
  is_visible: boolean
  access_level: string
}

export interface RegistrationQuestion {
  id: string
  label: string
  required: boolean
  question_type: QuestionTypeEnum
}

export interface SeriesInfo {
  require_rsvp_approval: boolean
  series_registration_mode: null
  session_price_cents: null
  ticket_currency: string
  ticket_price_cents: null
}

export interface ThemeMeta {
  theme: string
}

export interface TicketInfo {
  price: null
  is_free: boolean
  max_price: null
  is_sold_out: boolean
  spots_remaining: null
  is_near_capacity: boolean
  require_approval: boolean
}

export interface TicketType {
  api_id: string
  cents: null
  currency: null
  description: null
  ethereum_token_requirements: any[]
  event_api_id: string
  is_flexible: boolean
  max_capacity: null
  min_cents: null
  name: string
  require_approval: boolean
  type: string
  valid_end_at: null
  valid_start_at: null
  position: string
  num_tickets_registered: number
  num_guests: number
}
