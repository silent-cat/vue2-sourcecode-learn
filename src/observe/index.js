class Observer{
    constructor(data){
        this.walk(data)
    }
    walk(data){
        Object.keys(data).forEach(key=>defineReactive(data,key,data[key]))
    }
}

function defineReactive(target,key,value){
    observe(value)
    Object.defineProperty(target,key,{
        get(){
            return value
        },
        set(newValue){
            if(value == newValue) return
            value = newValue
        }
    })
}

export function observe(data){
    if(typeof data!=='object' || data == null){
        return //只对对象进行劫持
    }
    // 如果一个对象被劫持过了，就不需要再劫持

    return new Observer(data)
}