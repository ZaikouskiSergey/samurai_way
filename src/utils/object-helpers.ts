
export const updateObjectInArray = (items: Array<any>, itemId: number, objPropName: any, newObjectProps: any) => {
    return items.map(u => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjectProps}
        }
        return u
    })
}