export default {
    set: (key: string, value: string | object) => {
        if (typeof value === 'object') {
            localStorage.setItem(key, JSON.stringify(value))
            return
        }
        localStorage.setItem(key, value)
    },
    get: <T>(key: string, defaultValue: T): T => {
        const value = localStorage.getItem(key)
        if (!value)
            return defaultValue
        try {
            return (JSON.parse(value) as T)
        } catch {
            return value as T
        }
    }
}
