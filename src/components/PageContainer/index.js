export default function PageContainer({ title, children, className }) {
    return (
        <main className="page">
            <div className={'container ' +( className || '')}>
                {children}
            </div>
        </main>
    );
}