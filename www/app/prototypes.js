document.tn = {};
document.tn.elem = function( type, properties ) {
    if (!type) return null;
    var node = document.createElement( type );
    for (var prop in properties) {
        try {
            node[ prop ] = properties[ prop ];
        } catch (e) {
            node.data = properties[ prop ];
            if (e) return node;
        }
    }
    return node;
        
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
