import MotionTest from "./motion"

function App() {
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                padding: "40px",
                color: "white",
                backgroundColor: "#111",
                boxSizing: "border-box",
            }}
        >
            <h1>Typing Survival</h1>
            <MotionTest />
        </div>
    )
}

export default App