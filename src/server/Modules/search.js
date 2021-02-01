function search(arr, query) {
    console.log(query)
    var items = arr;
    if (query.hasOwnProperty('id')) {
        items = items.filter(o => o.id === query['id'])
    }
    if (query.hasOwnProperty('price_min') && query.hasOwnProperty('price_max')) {
        items = items.filter(o => Number(o.price) >= Number(query['price_min']) && Number(o.price) <= Number(query['price_max']))
    }
    if (query.hasOwnProperty('neighbourhood_group')) {
        items = items.filter(o => o.neighbourhood_group === query['neighbourhood_group'])
    }
    if (query.hasOwnProperty('neighbourhood')) {
        items = items.filter(o => o.neighbourhood === query['neighbourhood'])
    }
    if (query.hasOwnProperty('room_type')) {
        items = items.filter(o => o.room_type === query['room_type'])
    }
    if (query.hasOwnProperty('name')) {
        items = items.filter(o => o.name === query['name'])
    }
    if (query.hasOwnProperty['Availability'] && query.availability_365 > 0) {
        items = items.filter(o => o.availability_365 > 0)
    }
    var pk = 0;
    if (query.hasOwnProperty('pk')) {
        pk = Number(query['pk']);
    }
    
    return {
        items: items.slice(pk * 15, pk * 15 + 15),
        has_previous: pk !== 0,
        has_next: items.length > pk * 15 + 15,
    }
}

module.exports = {
    search
}