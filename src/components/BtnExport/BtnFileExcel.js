import './style.css';

function BtnFileExcel({ onClick, title = 'Xuất Excel' }) {
    return (
        <button onClick={onClick} className="btn-excel">
            {title}
        </button>
    );
}
export default BtnFileExcel;
