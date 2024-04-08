export const TailwindBreakpointIndicator = () => {
  if (process.env.NODE_ENV !== 'development') return null
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-min z-50 bg-black text-white p-2 text-xs font-mono whitespace-nowrap">
      <span className="hidden max-sm:block">sub sm</span>
      <span className="hidden sm:max-md:block">sm</span>
      <span className="hidden md:max-lg:block">md</span>
      <span className="hidden lg:max-xl:block">lg</span>
      <span className="hidden xl:block">xl</span>
    </div>
  )
}
