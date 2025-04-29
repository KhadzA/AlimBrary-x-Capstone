"use client"

export default function LogoutModal({ isOpen, onClose, onConfirm, isLoading }) {
    if (!isOpen) return null

    return (
        <div className="modal-overlay" onClick={isLoading ? null : onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Are you sure you want to logout?</h2>
                <div className="modal-buttons">
                    <button onClick={onConfirm} disabled={isLoading} className="logout-button">
                        {isLoading ? (
                            <span className="button-content">
                                <span className="spinner"></span>
                                <span>Logging out...</span>
                            </span>
                        ) : (
                            "Yes, Logout"
                        )}
                    </button>
                    <button onClick={onClose} disabled={isLoading} className="cancel-button">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
