/*global define*/
'use strict';
define([
	'backbone',
	'mustache',
	'common-objects/collections/baselines',
	'text!common-objects/templates/baselines/baseline_select.html',
	'common-objects/views/baselines/snap_baseline_view'
], function (Backbone, Mustache, Baselines, template, SnapBaselineView) {

	var BaselineSelectView = Backbone.View.extend({
		events:{
			'change select' : 'onSelectorChanged',
			'click button.newBaseline':'createBaseline',
			'click button.deleteBaseline':'deleteBaseline'
		},

		initialize:function(){
			this.type = (this.options && this.options.type) ? this.options.type : 'product';
			if(!this.collection){
				var data = {
					type : this.type
				};
				if(this.type==='product'){
					data.productId = APP_CONFIG.productId;
				}
				this.collection = new Baselines({},data);
			}
			this.listenToOnce(this.collection,'reset',this.onCollectionReset);
		},

		render:function(){
			this.$el.html(Mustache.render(template, {i18n:APP_CONFIG.i18n}));
			this.bindDomElements();
			this.hideMenu();
			this.collection.fetch({reset:true});
			return this ;
		},

		bindDomElements:function(){
			this.$select = this.$('select');
			this.$menu = this.$('.ConfigSpecSelector-menu');
			this.$newBaselineBtn = this.$('.btn.newBaseline');
			this.$deleteBaselineBtn = this.$('.btn.deleteBaseline');
			if(APP_CONFIG.configSpec==='latest' || APP_CONFIG.configSpec==='released'){
				this.$deleteBaselineBtn.attr("disabled", "disabled");
				this.$deleteBaselineBtn.hide();
			}
		},

		onCollectionReset:function(){
			this.onCollectionChange();
			this.listenTo(this.collection,'change',this.onCollectionChange);
		},

		onCollectionChange:function(){
			var that = this ;
			if(this.$select){
				this.$select.find('option').remove();
				this.$select.append('<option value="latest">'+APP_CONFIG.i18n.LATEST_SHORT+'</option>');
				//this.$select.append('<option value="released">'+APP_CONFIG.i18n.RELEASED_SHORT+'</option>');
				this.collection.each(function(baseline){
					that.$select.append('<option value="'+baseline.getId()+'">'+baseline.getName()+'</option>');
				});
			}
			if(APP_CONFIG.configSpec){
				this.$select.val(APP_CONFIG.configSpec);
			}
		},

		onSelectorChanged:function(e){
			this.trigger('config_spec:changed', e.target.value);
			if(e.target.value==='latest' || e.target.value==='released'){
				this.$deleteBaselineBtn.attr("disabled", "disabled");
				this.$newBaselineBtn.removeAttr("disabled");
				this.$deleteBaselineBtn.hide();
			}else{
				this.$deleteBaselineBtn.show();
				this.$deleteBaselineBtn.removeAttr("disabled");
				this.$newBaselineBtn.attr("disabled", "disabled");
			}
		},

		createBaseline:function(){
			var snapBaselineView;
			if(this.type==='document'){
				snapBaselineView = new SnapBaselineView({type: 'DOCUMENT', collection: this.collection});
			}
			//Todo add baseline on product-structure
			$('body').append(snapBaselineView.render().el);
			snapBaselineView.openModal();
		},

		deleteBaseline:function(){
			var that = this;

			if(confirm(APP_CONFIG.i18n.DELETE_SELECTION_QUESTION)){
				this.collection.each(function(baseline){

					if(parseInt(that.$select.val(),10)===baseline.getId()){
						baseline.destroy({
							dataType: 'text', // server doesn't send a json hash in the response body
							success:function(){
								that.$select.find('option[value='+baseline.getId()+']').remove();
								that.$select.val('latest').change();
							},
							error:function(model,err){
								alert(err.responseText);
						}});
					}
				});
			}
		},

		showMenu: function(){
			this.$menu.show();
		},

		hideMenu: function(){
			this.$menu.hide();
		}

	});

	return BaselineSelectView;
});