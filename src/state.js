import { observe } from "./observe/index";

export function initState(vm){
    const opts = vm.$options
    if(opts.data){
        initData(vm)
    }
}

function initData(vm){
    let data = vm.$options.data
    data = typeof data === 'function'?data.call(vm):data
    console.log(data);

    vm._data = data

    observe(data)

    // 将vm._data用vm进行代理
    for(let key in data){
        proxy(vm,'_data',key)
    }
}

function proxy(vm,target,key){
    Object.defineProperty(vm,key,{
        get(){
            return vm[target][key]
        },
        set(newValue){
            vm[target][key] = newValue
        }
    })
}