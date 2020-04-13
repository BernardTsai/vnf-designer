export default function ({path, file_names, component_names}) {
    let registered_components = {}
    for (let [index, file_name] of file_names.entries()) {
        registered_components[component_names[index]] = () => import(`../${path}/${file_name}.vue`)
    }
    return registered_components
}