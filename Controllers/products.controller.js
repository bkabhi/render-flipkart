import  products  from '../Models/products.model.js';


async function getProduct(req,res) {
    try {
        // console.log(req.query)
        // let {category} = req.query;
        // let data;
        // if(category) {
        //     console.log("here")
        //     data = await products.find({category_name: category})
        // }
        // else {
        //     data = await products.find();

        // }
        // if(!data) {
        //     return res.send(404).send({
        //         status: 'Error',
        //         message: "Not Found"
        //     })
        // }
        // return res.send({
        //     status: "Success",
        //     data: data
        // })
        console.log(req.query)
        // let data = await products.find();
        const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 5;
		const search = req.query.q || "";
        console.log(search);
		let sort = req.query.sort || "rating";
		let category = req.query.category || "All";
        // let order = req.query.order || "asc";
		const categoryOptions = [
			"appliances",
			"electronics",
			"fashion",
			"grocery",
			"mobiles",
			"home",
			"top_offers"
		];

		category === "All"
			? (category = [...categoryOptions])
			: (category = req.query.category.split(","));
		req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

		let sortBy = {};
		if (sort[1]) {
			sortBy[sort[0]] = sort[1];
		} else {
			sortBy[sort[0]] = "asc";
		}

		const product = await products.find({ description: { $regex: search, $options: "i" } })
			.where("category_name")
			.in([...category])
			.sort(sortBy)
			.skip(page * limit)
			.limit(limit);

		const total = await products.countDocuments({
			category: { $in: [...category] },
			description: { $regex: search, $options: "i" },
		});

		const data = {
			total,
			page: page + 1,
			limit,
			product
		};

		res.send(data);
    } catch (error) {
        return res.send(500).send({
            status: 'Error',
            message: 'Internal Server Error'
        })
    }
}
async function getProductById(req,res) {
    try {
        let {id} = req.params;
        const data = await products.findById(id);
        if(!data) {
            return res.status(404).send({
                status: 'Error',
                message: "Not Found"
            })
        }
        return res.send({
            status: "Success",
            data: data
        })
    } catch (error) {
        return res.send(500).send({
            status: 'Error',
            message: 'Internal Server Error'
        })
    }
}
async function postProduct(req,res) {
    try {
        const data = await products.create(req.body);
        return res.send({
            status: "Success",
            data: data
        })
        if(!data) {
            return res.status(400).send({
                status: 'Error',
                message: 'Somethng went wrong'
            })
        }
    } catch (error) {
        return res.send(500).send({
            status: 'Error',
            message: 'Internal Server Error'
        })
    }
}


export {getProduct, postProduct, getProductById};