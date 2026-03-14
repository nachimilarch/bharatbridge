const VARIANTS = {
  primary:   'bg-[#1E3A5F] hover:bg-[#16304F] text-white',
  secondary: 'bg-orange-500 hover:bg-orange-600 text-white',
  outline:   'border-2 border-[#1E3A5F] text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white',
  ghost:     'text-[#1E3A5F] hover:bg-[#1E3A5F]/10',
  danger:    'bg-red-500 hover:bg-red-600 text-white',
};

const SIZES = {
  sm:  'px-3 py-1.5 text-xs',
  md:  'px-5 py-2.5 text-sm',
  lg:  'px-7 py-3 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled,
  ...props
}) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold rounded-xl
        transition-colors duration-150 focus:outline-none focus-visible:ring-2
        focus-visible:ring-[#1E3A5F]/50 disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANTS[variant] || VARIANTS.primary}
        ${SIZES[size] || SIZES.md}
        ${className}
      `.trim()}
    >
      {loading && (
        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
