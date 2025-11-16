export default function Toast({ message, type }) {          

    const bgColor = type === "success" ? "bg-success" : "bg-danger";                
    return (    
        <div className={`toast-container position-fixed bottom-0 end-0 p-3`} style={{ zIndex: 11 }}>    
            <div className={`toast show ${bgColor} text-white`} role="alert" aria-live="assertive" aria-atomic="true">    
                <div className="toast-body">    
                    {message}   
                </div>  
            </div>
        </div>
    );    
}       

    