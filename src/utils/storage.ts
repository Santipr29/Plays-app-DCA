export enum PersistanceKeys{
    "STORE" = "STORE"
}

const get = <T>({
    key,
    defaultValue,
  }: {
    key: PersistanceKeys;
    defaultValue: T;
  }): T => {
    const keyValue = localStorage.getItem(key) || sessionStorage.getItem(key)
    return keyValue ? JSON.parse(keyValue) : defaultValue;
  };
  
  const set = ({
    key,
    value,
    session = false,
  }: {
    key: PersistanceKeys;
    value: unknown;
    session?: boolean;
  }) => {
    const storage = session? sessionStorage : localStorage;
    const parsed = JSON.stringify(value);
    storage.setItem(key, parsed);
  };
  
  export default {
    get,
    set,
  };