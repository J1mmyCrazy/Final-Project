import { motion } from "motion/react"

function TestMotion() {
    return (
        <motion.div
            initial={{ x: 0 }}
            animate={{ x: 300 }}
            transition={{ duration: 2 }}
            style={{
                width: 100,
                height: 100,
                background: "red",
            }}
        />
    )
}

export default TestMotion