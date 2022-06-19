const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { type: String, require: true },
    ean: { type: String },
    article_code:{ type: String, require: true },
    master_category:{ type: String, require: true },
    category:{ type: String, require: true },
    product_type:{ type: String, require: true },
    brand:{ type: String, require: true },
    slug:{ type: String, require: true },
    unit:{ type: String, require: true },
    sale_unit:{ type: String, require: true },
    purchase_unit:{ type: String, require: true },
    alert_quantity:{ type: Number, require: true },
    vat:{ type: Number, require: true },
    vat_method:{ type: Boolean, require: true },
    featured:{ type: Boolean, require: true },
    shipping_method:{ type: String, require: true },
    hide_website:{ type: Boolean, require: true },
    photo:{ type: String, require: true },
    status:{ type: String, enum: ['active', 'inactive'] }

}, {
    timestamps: true
})

const Product = new mongoose.model("Product", productSchema);
module.exports = Product;