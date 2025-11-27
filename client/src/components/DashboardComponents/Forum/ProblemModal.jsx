import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {usePost} from '../../../hooks/usePost'; 

const ModalContent = ({ handleClose, onProblemCreated, show, loading, error, postData }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tagsInput, setTagsInput] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const tagsArray = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
        const newProblem = { title, body, tags: tagsArray };

        try {
            await postData(newProblem);
            
            // Success: clear form and close modal
            setTitle('');
            setBody('');
            setTagsInput('');
            onProblemCreated(); 
        } catch (err) {
            // Error is handled by usePost hook
        }
    };

    // The Bootstrap modal structure, using 'show' and 'fade' classes
    return (
        <div 
            className={`modal fade ${show ? 'show d-block' : ''}`} 
            tabIndex="-1" 
            role="dialog" 
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} // Simple backdrop
            onClick={loading ? undefined : handleClose} // Close on backdrop click if not loading
        >
            <div className="modal-dialog modal-dialog-centered" role="document" onClick={e => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Ask a New Question</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={loading ? undefined : handleClose} disabled={loading}></button>
                    </div>
                    <div className="modal-body">
                        {error && <div className="alert alert-danger" role="alert">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="problemTitle" className="form-label">Title</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="problemTitle"
                                    placeholder="Enter a brief, descriptive title" 
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value)} 
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="problemBody" className="form-label">Details</label>
                                <textarea 
                                    className="form-control" 
                                    id="problemBody" 
                                    rows="5" 
                                    placeholder="Describe your problem or question in detail" 
                                    value={body} 
                                    onChange={(e) => setBody(e.target.value)} 
                                    required
                                    disabled={loading}
                                ></textarea>
                            </div>
                            
                            <div className="mb-3">
                                <label htmlFor="problemTags" className="form-label">Tags (Optional)</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="problemTags"
                                    placeholder="e.g., career, software, separated by commas" 
                                    value={tagsInput} 
                                    onChange={(e) => setTagsInput(e.target.value)} 
                                    disabled={loading}
                                />
                            </div>

                            <button type="submit" className="btn btn-success w-100" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Posting...
                                    </>
                                ) : 'Post Question'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Main Modal Component using Portal
const CreateProblemModal = ({ handleClose, onProblemCreated }) => {
    const API_URL = '/forum/problems';
    const { postData, loading, error } = usePost(`${import.meta.env.VITE_API_URL}/forum/problems`);

    // We use a portal to ensure the modal is rendered outside the root component, 
    // which is the standard practice for modals.
    return ReactDOM.createPortal(
        <ModalContent 
            handleClose={handleClose} 
            onProblemCreated={onProblemCreated} 
            show={true} // Always true when mounted
            loading={loading}
            error={error}
            postData={postData}
        />,
        // Ensure you have a div with id="modal-root" in your public/index.html
        document.getElementById('modal-root') || document.body 
    );
};

export default CreateProblemModal;