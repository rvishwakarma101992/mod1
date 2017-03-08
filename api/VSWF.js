(function () {	'use strict';

module.exports = function(app, db){
	
	app
	.get('/VSWF_list',get_all_VSWF_list)
	.post('/VSWF_list',insert_into_VSWF_list)
	.delete('/VSWF_list/:VSWF_list_id',delete_from_VSWF_list)
	.get('/VSWF_list/get_by_id/:VSWF_list_id',get_by_id_from_VSWF_list)
	.get('/VSWF_list/get_by_email/:email_id',get_by_email_id_from_VSWF_list)
	.put('/VSWF_list/update_partially/:VSWF_list_id',update_existing_partially_from_VSWF_list)
	.put('/VSWF_list/update_fully/:VSWF_list_id',update_existing_fully_from_VSWF_list)
	;

	function get_all_VSWF_list(req, res){
		db.collection_VSWF_list.find(callback_find);
		function callback_find(err, result) {
			if(err){
				console.log("ON ERROR: " + "Record NOT found");
				res.json(err);
				// throw err;
			}else{
	  			console.log("ON SUCCESS: " + "Record FOUND");
				res.json(result);
	  		} 
		}
	}

	function delete_from_VSWF_list(req, res){

		console.log(req.params.VSWF_list_id);

		db.collection_VSWF_list.remove(
			{_id: db.ObjectId(req.params.VSWF_list_id)},
			callback_remove
		);
		function callback_remove(err, result) {
			if(err){
				console.log("ON ERROR: " + "Record NOT deleted");
				res.json(err);
				// throw err;
			}else{
	  			console.log("ON SUCCESS: " + "Record DELETED");
				res.json(result);
	  		} 
		}
	}

	function get_by_id_from_VSWF_list(req, res){

		db.collection_VSWF_list.findOne(
			{_id: db.ObjectId(req.params.VSWF_list_id)},
			callback_findOne
		);
		function callback_findOne(err, result) {
			if(err){
				console.log("ON ERROR: " + "Record NOT found");
				res.json(err);
				// throw err;
			}else{
	  			console.log("ON SUCCESS: " + "Record FOUND");
				res.json(result);
	  		} 
		}
	}

	function get_by_email_id_from_VSWF_list(req, res){

		db.collection_VSWF_list.findOne(
			{email_id: req.params.email_id},
			callback_findOne
		);
		function callback_findOne(err, result) {
			if(err){
				console.log("ON ERROR: " + "Record NOT found");
				res.json(err);
				// throw err;
			}else{
	  			console.log("ON SUCCESS: " + "Record FOUND");
				res.json(result);
	  		} 
		}
	}


	function insert_into_VSWF_list(req, res){
		var object_to_insert = req.body;

		db.collection_VSWF_list.insert(object_to_insert, callback_insert);
		function callback_insert(err, result) {
			if(err){
				console.log("ON ERROR: " + "Record NOT inserted");
				res.json(err);
				// throw err;
			}else{
	  			console.log("ON SUCCESS: " + "Record INSERTED");
				res.json(result);
	  		} 
		}
	}

	function update_existing_partially_from_VSWF_list(req, res){
		db.collection_VSWF_list.update(
			{_id: db.ObjectId(req.params.VSWF_list_id)},
			{$set : {
				color: req.body.color
			}},
			callback_update 
		);
		function callback_update(err, result) {
			if(err){
				console.log("ON ERROR: " + "Record NOT updated");
				res.json(err);
				// throw err;
			}else{
	  			console.log("ON SUCCESS: " + "Record UPDATED");
				res.json(result);
	  		} 
		}

	}

	function update_existing_fully_from_VSWF_list(req, res){
		req.body._id = db.ObjectId(req.params.VSWF_list_id);

		console.log("inside update_existing_fully_from_VSWF_list");
		db.collection_VSWF_list.update(
			{_id: db.ObjectId(req.params.VSWF_list_id)},
			req.body,
			callback_update 
		);
		function callback_update(err, result) {
			if(err){
				console.log("ON ERROR: " + "Record NOT updated");
				res.json(err);
				// throw err;
			}else{
	  			console.log("ON SUCCESS: " + "Record UPDATED");
				res.json(result);
	  		} 
		}

	}

};

})();