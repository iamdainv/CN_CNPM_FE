
class ClientStorage {
   get (key) {
    return localStorage.getItem(key)
  };

   set (key, value) {
    localStorage.setItem(key, value)
  };

   getObject (key) { // Object | null
    const data = this.get(key)
    return data ? JSON.parse(data) : null
  };

   setObject (key, value) {
    this.set(key, JSON.stringify(value))
  };

   upsertObject (key, updates) {
    this.setObject(key, { ...this.getObject(key), ...updates })
  };

  remove (key) {
    localStorage.removeItem(key)
  };

   removeFromObject (key, keys) {
    const data = this.getObject(key)
    if (data == null) {
      return
    }

    keys.forEach((key) => {
      delete data[key]
    })
    this.setObject(key, data)
  };
}

export const staticClientStorage = new ClientStorage()
