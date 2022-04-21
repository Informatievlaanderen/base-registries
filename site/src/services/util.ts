export function capitalizeFirstCharacter(value?: string | null) {  
    if(value) {
        return value.length <= 1 ? value.toUpperCase() : value[0].toUpperCase() + value.slice(1) ;
    }
    return value;
}; 

export function interpolateString(text: string | undefined, args: any, onMissingParam?: (paramName: string) => void): string | undefined {
    if(!text) 
        return text;
    text = text.replace(/{\s*([A-Za-z0-9]+)\s*}/g, param => {
        const paramName = param
            .replace("{", "")
            .replace("}", "")
            .trim();

        if (args[paramName] === undefined) {
            onMissingParam && onMissingParam(paramName);
            return param;
        } else {
            return args[paramName] as string;
        }
    });

    return text;
}

export function GetPropByName(obj: any, key: string) {
    let o = obj || {};
    let s = key || "";
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

export default {
    GetPropByName,
    capitalizeFirstCharacter,
    interpolateString
};
