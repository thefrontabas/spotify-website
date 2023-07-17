import loading from './loading.gif';

export default function Loading(params) {
    return (
        <>
            <div
                className="loadbox"
                style={{
                    textAlign: 'center',
                    position: 'fixed',
                    right: '0',
                    width: '100%',
                    zIndex: '300',
                    height: '100%',
                    paddingTop: '14rem',
                    background:
                        'linear-gradient(180deg, #1b1b1b 0%, rgb(12, 12, 12) 100%)',
                }}
            >
                <img
                    src={loading}
                    alt="loading"
                    style={{ width: '80px', cursor: 'pointer' }}
                />
            </div>
        </>
    );
}
