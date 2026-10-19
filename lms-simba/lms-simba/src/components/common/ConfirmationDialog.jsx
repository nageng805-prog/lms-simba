import Modal from './Modal'

export default function ConfirmationDialog({ open, title, message, confirmLabel = 'Ya, lanjutkan', onConfirm, onCancel }) {
  return (
    <Modal open={open} title={title} onClose={onCancel}
      footer={<>
        <button className="btn-secondary" onClick={onCancel}>Batal</button>
        <button className="btn-danger" onClick={onConfirm}>{confirmLabel}</button>
      </>}>
      {message}
    </Modal>
  )
}
