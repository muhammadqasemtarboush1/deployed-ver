export default function Layout({ children, label }) {
    return (
        <>
            <div className="flex-1 w-full mx-2">
                <div className="h-6 mt-3 text-xs font-bold leading-8 text-white uppercase">
                    {label}
                </div>
                <div className="flex p-1 my-2 bg-white border border-gray-200 rounded-xl">
                    {children}
                </div>
            </div>
        </>
    )
}