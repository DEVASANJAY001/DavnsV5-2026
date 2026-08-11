import React, { useState, useRef, useEffect } from "react"
import { ChevronDown, Search, Phone, Check } from "lucide-react"

export interface CountryItem {
  name: string
  code: string
  dialCode: string
  flag: string
}

export const COUNTRIES: CountryItem[] = [
  // Top Popular / Primary
  { name: "India", code: "IN", dialCode: "+91", flag: "🇮🇳" },
  { name: "United States", code: "US", dialCode: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "GB", dialCode: "+44", flag: "🇬🇧" },
  { name: "United Arab Emirates", code: "AE", dialCode: "+971", flag: "🇦🇪" },
  { name: "Singapore", code: "SG", dialCode: "+65", flag: "🇸🇬" },
  { name: "Canada", code: "CA", dialCode: "+1", flag: "🇨🇦" },
  { name: "Australia", code: "AU", dialCode: "+61", flag: "🇦🇺" },
  { name: "Germany", code: "DE", dialCode: "+49", flag: "🇩🇪" },
  { name: "France", code: "FR", dialCode: "+33", flag: "🇫🇷" },
  { name: "Saudi Arabia", code: "SA", dialCode: "+966", flag: "🇸🇦" },
  { name: "Qatar", code: "QA", dialCode: "+974", flag: "🇶🇦" },
  { name: "Oman", code: "OM", dialCode: "+968", flag: "🇴🇲" },
  { name: "Kuwait", code: "KW", dialCode: "+965", flag: "🇰🇼" },
  { name: "Bahrain", code: "BH", dialCode: "+973", flag: "🇧🇭" },
  { name: "Malaysia", code: "MY", dialCode: "+60", flag: "🇲🇾" },
  { name: "Indonesia", code: "ID", dialCode: "+62", flag: "🇮🇩" },
  { name: "Japan", code: "JP", dialCode: "+81", flag: "🇯🇵" },
  { name: "South Korea", code: "KR", dialCode: "+82", flag: "🇰🇷" },
  { name: "China", code: "CN", dialCode: "+86", flag: "🇨🇳" },
  { name: "Hong Kong", code: "HK", dialCode: "+852", flag: "🇭🇰" },
  { name: "Taiwan", code: "TW", dialCode: "+886", flag: "🇹🇼" },
  { name: "Bangladesh", code: "BD", dialCode: "+880", flag: "🇧🇩" },
  { name: "Sri Lanka", code: "LK", dialCode: "+94", flag: "🇱🇰" },
  { name: "Nepal", code: "NP", dialCode: "+977", flag: "🇳🇵" },
  { name: "Pakistan", code: "PK", dialCode: "+92", flag: "🇵🇰" },
  { name: "Bhutan", code: "BT", dialCode: "+975", flag: "🇧🇹" },
  { name: "Maldives", code: "MV", dialCode: "+960", flag: "🇲🇻" },
  
  // Europe
  { name: "Switzerland", code: "CH", dialCode: "+41", flag: "🇨🇭" },
  { name: "Netherlands", code: "NL", dialCode: "+31", flag: "🇳🇱" },
  { name: "Sweden", code: "SE", dialCode: "+46", flag: "🇸🇪" },
  { name: "Norway", code: "NO", dialCode: "+47", flag: "🇳🇴" },
  { name: "Denmark", code: "DK", dialCode: "+45", flag: "🇩🇰" },
  { name: "Finland", code: "FI", dialCode: "+358", flag: "🇫🇮" },
  { name: "Ireland", code: "IE", dialCode: "+353", flag: "🇮🇪" },
  { name: "Italy", code: "IT", dialCode: "+39", flag: "🇮🇹" },
  { name: "Spain", code: "ES", dialCode: "+34", flag: "🇪🇸" },
  { name: "Portugal", code: "PT", dialCode: "+351", flag: "🇵🇹" },
  { name: "Belgium", code: "BE", dialCode: "+32", flag: "🇧🇪" },
  { name: "Austria", code: "AT", dialCode: "+43", flag: "🇦🇹" },
  { name: "Poland", code: "PL", dialCode: "+48", flag: "🇵🇱" },
  { name: "Czech Republic", code: "CZ", dialCode: "+420", flag: "🇨🇿" },
  { name: "Greece", code: "GR", dialCode: "+30", flag: "🇬🇷" },
  { name: "Hungary", code: "HU", dialCode: "+36", flag: "🇭🇺" },
  { name: "Romania", code: "RO", dialCode: "+40", flag: "🇷🇴" },
  { name: "Turkey", code: "TR", dialCode: "+90", flag: "🇹🇷" },
  { name: "Ukraine", code: "UA", dialCode: "+380", flag: "🇺🇦" },
  { name: "Cyprus", code: "CY", dialCode: "+357", flag: "🇨🇾" },
  { name: "Estonia", code: "EE", dialCode: "+372", flag: "🇪🇪" },
  { name: "Latvia", code: "LV", dialCode: "+371", flag: "🇱🇻" },
  { name: "Lithuania", code: "LT", dialCode: "+370", flag: "🇱🇹" },
  { name: "Luxembourg", code: "LU", dialCode: "+352", flag: "🇱🇺" },
  { name: "Malta", code: "MT", dialCode: "+356", flag: "🇲🇹" },
  { name: "Iceland", code: "IS", dialCode: "+354", flag: "🇮🇸" },
  { name: "Croatia", code: "HR", dialCode: "+385", flag: "🇭🇷" },
  { name: "Bulgaria", code: "BG", dialCode: "+359", flag: "🇧🇬" },
  { name: "Slovakia", code: "SK", dialCode: "+421", flag: "🇸🇰" },
  { name: "Slovenia", code: "SI", dialCode: "+386", flag: "🇸🇮" },

  // Asia & Pacific
  { name: "New Zealand", code: "NZ", dialCode: "+64", flag: "🇳🇿" },
  { name: "Philippines", code: "PH", dialCode: "+63", flag: "🇵🇭" },
  { name: "Vietnam", code: "VN", dialCode: "+84", flag: "🇻🇳" },
  { name: "Thailand", code: "TH", dialCode: "+66", flag: "🇹🇭" },
  { name: "Cambodia", code: "KH", dialCode: "+855", flag: "🇰🇭" },
  { name: "Laos", code: "LA", dialCode: "+856", flag: "🇱🇦" },
  { name: "Myanmar", code: "MM", dialCode: "+95", flag: "🇲🇲" },
  { name: "Brunei", code: "BN", dialCode: "+673", flag: "🇧🇳" },
  { name: "Fiji", code: "FJ", dialCode: "+679", flag: "🇫🇯" },
  { name: "Papua New Guinea", code: "PG", dialCode: "+675", flag: "🇵🇬" },
  { name: "Kazakhstan", code: "KZ", dialCode: "+7", flag: "🇰🇿" },
  { name: "Uzbekistan", code: "UZ", dialCode: "+998", flag: "🇺🇿" },

  // Middle East & Africa
  { name: "Israel", code: "IL", dialCode: "+972", flag: "🇮🇱" },
  { name: "Jordan", code: "JO", dialCode: "+962", flag: "🇯🇴" },
  { name: "Lebanon", code: "LB", dialCode: "+961", flag: "🇱🇧" },
  { name: "Egypt", code: "EG", dialCode: "+20", flag: "🇪🇬" },
  { name: "South Africa", code: "ZA", dialCode: "+27", flag: "🇿🇦" },
  { name: "Nigeria", code: "NG", dialCode: "+234", flag: "🇳🇬" },
  { name: "Kenya", code: "KE", dialCode: "+254", flag: "🇰🇪" },
  { name: "Ghana", code: "GH", dialCode: "+233", flag: "🇬🇭" },
  { name: "Ethiopia", code: "ET", dialCode: "+251", flag: "🇪🇹" },
  { name: "Tanzania", code: "TZ", dialCode: "+255", flag: "🇹🇿" },
  { name: "Uganda", code: "UG", dialCode: "+256", flag: "🇺🇬" },
  { name: "Morocco", code: "MA", dialCode: "+212", flag: "🇲🇦" },
  { name: "Algeria", code: "DZ", dialCode: "+213", flag: "🇩🇿" },
  { name: "Tunisia", code: "TN", dialCode: "+216", flag: "🇹🇳" },
  { name: "Mauritius", code: "MU", dialCode: "+230", flag: "🇲🇺" },
  { name: "Rwanda", code: "RW", dialCode: "+250", flag: "🇷🇼" },
  { name: "Seychelles", code: "SC", dialCode: "+248", flag: "🇸🇨" },
  { name: "Zambia", code: "ZM", dialCode: "+260", flag: "🇿🇲" },
  { name: "Zimbabwe", code: "ZW", dialCode: "+263", flag: "🇿🇼" },

  // Americas
  { name: "Brazil", code: "BR", dialCode: "+55", flag: "🇧🇷" },
  { name: "Mexico", code: "MX", dialCode: "+52", flag: "🇲🇽" },
  { name: "Argentina", code: "AR", dialCode: "+54", flag: "🇦🇷" },
  { name: "Chile", code: "CL", dialCode: "+56", flag: "🇨🇱" },
  { name: "Colombia", code: "CO", dialCode: "+57", flag: "🇨🇴" },
  { name: "Peru", code: "PE", dialCode: "+51", flag: "🇵🇪" },
  { name: "Costa Rica", code: "CR", dialCode: "+506", flag: "🇨🇷" },
  { name: "Panama", code: "PA", dialCode: "+507", flag: "🇵🇦" },
  { name: "Uruguay", code: "UY", dialCode: "+598", flag: "🇺🇾" },
  { name: "Ecuador", code: "EC", dialCode: "+593", flag: "🇪🇨" },
  { name: "Dominican Republic", code: "DO", dialCode: "+1809", flag: "🇩🇴" },
  { name: "Jamaica", code: "JM", dialCode: "+1876", flag: "🇯🇲" },
  { name: "Trinidad and Tobago", code: "TT", dialCode: "+1868", flag: "🇹🇹" },
]

interface PhoneInputWithCountryProps {
  label: string
  required?: boolean
  optionalBadge?: boolean
  value: string
  onChange: (val: string) => void
  selectedDialCode: string
  onDialCodeChange: (code: string) => void
  placeholder?: string
  id?: string
  className?: string
  darkTheme?: boolean
}

export function PhoneInputWithCountry({
  label,
  required = false,
  optionalBadge = false,
  value,
  onChange,
  selectedDialCode,
  onDialCodeChange,
  placeholder = "98765 43210",
  id,
  className = "",
  darkTheme = false,
}: PhoneInputWithCountryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  // Find currently selected country item
  const selectedCountry =
    COUNTRIES.find((c) => c.dialCode === selectedDialCode) || COUNTRIES[0]

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dialCode.includes(search) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label className={`block text-xs font-mono font-semibold uppercase ${
          darkTheme ? "text-slate-300" : "text-slate-700"
        }`}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {optionalBadge && (
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            OPTIONAL
          </span>
        )}
      </div>

      <div className="relative flex rounded-2xl shadow-2xs">
        {/* Country Code Selector Button */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`h-full px-3 py-2.5 rounded-l-2xl border-y border-l transition-colors flex items-center gap-1.5 text-xs sm:text-sm font-mono cursor-pointer shrink-0 ${
              darkTheme
                ? "bg-white/10 border-white/10 hover:bg-white/15 text-white"
                : "bg-slate-100 border-slate-200 hover:bg-slate-200/80 text-slate-800"
            }`}
            title={`${selectedCountry.name} (${selectedCountry.dialCode})`}
          >
            <span className="text-base leading-none">{selectedCountry.flag}</span>
            <span className="font-bold">{selectedCountry.dialCode}</span>
            <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Searchable Country Dropdown Modal */}
          {isOpen && (
            <div className={`absolute top-full left-0 mt-1.5 w-72 max-h-72 overflow-hidden rounded-2xl border shadow-2xl z-50 animate-fade-in-simple flex flex-col ${
              darkTheme
                ? "bg-slate-900 border-slate-800 text-white"
                : "bg-white border-slate-200 text-slate-900"
            }`}>
              {/* Search Bar */}
              <div className={`p-2.5 border-b sticky top-0 z-10 ${
                darkTheme ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
              }`}>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search country or code (+91, +1, UK...)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={`w-full pl-8 pr-3 py-1.5 rounded-xl text-xs outline-none ${
                      darkTheme
                        ? "bg-white/5 border border-white/10 text-white focus:border-[#7C3AED]"
                        : "bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#7C3AED]"
                    }`}
                  />
                </div>
              </div>

              {/* Country List */}
              <div className="overflow-y-auto max-h-56 p-1 space-y-0.5">
                {filteredCountries.length === 0 ? (
                  <div className="p-3 text-center text-xs text-slate-400">
                    No country found.
                  </div>
                ) : (
                  filteredCountries.map((item) => (
                    <button
                      key={`${item.code}-${item.dialCode}`}
                      type="button"
                      onClick={() => {
                        onDialCodeChange(item.dialCode)
                        setIsOpen(false)
                        setSearch("")
                      }}
                      className={`w-full px-3 py-2 rounded-xl text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        item.dialCode === selectedDialCode
                          ? "bg-[#7C3AED] text-white font-bold"
                          : darkTheme
                          ? "hover:bg-white/10 text-slate-200"
                          : "hover:bg-slate-100 text-slate-800"
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span className="text-base leading-none">{item.flag}</span>
                        <span className="truncate">{item.name}</span>
                      </span>
                      <span className="font-mono text-[11px] font-bold opacity-85 shrink-0 ml-2">
                        {item.dialCode}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Local Number Input */}
        <input
          type="tel"
          id={id}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`flex-1 min-w-0 px-3.5 py-2.5 rounded-r-2xl border-y border-r text-xs sm:text-sm outline-none transition-all ${
            darkTheme
              ? "bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20"
              : "bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20"
          }`}
        />
      </div>
    </div>
  )
}
