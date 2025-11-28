export default function ProfileWrapper({children,className=''}){
    return (
        <div className={`row container px-2 px-md-4 py-3 ${className}`} >
        {children}
        </div>
    )
}

