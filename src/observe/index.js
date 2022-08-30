import { newArrayProto } from "./array"

class Observer{
    constructor(data){
        // Object.defineProperty 只能劫持已存在的属性
        Object.defineProperty(data,'__ob__',{
            value:this,
            enumerable:false // 将__ob__变成不可枚举（循环的时候无法获取到）
        })
        if(Array.isArray(data)){
            // 重新数组的7个变异方法（可以修改数组本身的）

            data.__proto__= newArrayProto //保留数组原有的特性，并且重写部分方法
            this.observeArray(data)
        }else{
            this.walk(data)

        }
    }
    walk(data){
        Object.keys(data).forEach(key=>defineReactive(data,key,data[key]))
    }
    observeArray(data){
        data.forEach(item=>observe(item))
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
            observe(newValue)
            value = newValue
        }
    })
}

export function observe(data){
    if(typeof data!=='object' || data == null){
        return //只对对象进行劫持
    }
    // 如果一个对象被劫持过了，就不需要再劫持
    if(data.__ob__ instanceof Observer){
        return data.__ob__
    }

    return new Observer(data)
}