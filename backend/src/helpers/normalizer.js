const mongoose = require('mongoose');

class Normalizer {
    constructor(isReference = true, model = null) {
        this.model = model;
        this.isReference = isReference;
    }

    normalize(property) {
        try {
            const target = property ?? this.model;
            let res = [];

            if (!target) return null;
            if (Array.isArray(target)) {
                res = target.map((tag) => (this.isReference
                    ? mongoose.Types.ObjectId(tag.toString().trim())
                    : tag.trim()));
            } else {
                res = target
                .split(',')
                .map((tag) => (this.isReference ? mongoose.Types.ObjectId(tag.trim())
                : tag.trim()));
            }
            return res;
        } catch (exception) {
            console.error(exception);
            return null;
        }
    }
}

module.exports = Normalizer;
