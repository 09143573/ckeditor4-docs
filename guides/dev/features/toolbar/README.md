<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Toolbar Configuration

While CKEditor is a full-featured WYSIWYG editor, not all of its options
may be needed in all cases. Because of this, toolbar customization is
one of the most common requirements.

<div class="tip">
	The <strong>most recommended approach to adjusting the editor</strong> to your needs is to start from creating a
	<a href="http://ckeditor.com/builder">custom build</a>, removing unwanted features before they even
	make it to your toolbar. It is a bad practice to download the Full package and then 
	<a href="#!/api/CKEDITOR.config-cfg-removePlugins">remove plugins</a> or
	<a href="#!/api/CKEDITOR.config-cfg-removeButtons">buttons</a> in your configuration.
	You will only be loading unnecessary stuff without any good reason.
</div>

There are several approaches to CKEditor toolbar configuration to choose from:

 * [Using the toolbar configurator](#!/guide/dev_toolbar-section-toolbar-configurator) &mdash; the most recommended and easy to use solution.
 * [Toolbar groups configuration](#!/guide/dev_toolbar-section-toolbar-groups-configuration)
 * ["Item by item" configuration](#!/guide/dev_toolbar-section-%22item-by-item%22-configuration)

## Toolbar Configurator

<p class="requirements">
	Toolbar configurator was introduced in <strong>CKEditor 4.5</strong> and is be available in each official CKEditor installation package. 
</p>

The new toolbar utility, which you can find in your CKEditor distribution package, makes configuring an accessible toolbar a breeze.
It is the **most recommended way to set up the editor toolbar**.

You can use it to change the order of toolbar groups, select and deselect buttons, or break the toolbar into rows. Your current configuration is previewed live in the attached editor instance so you get instant feedback regarding the look and feel of your toolbar. When you are happy with your settings you can just copy the generated source code to paste into your [editor configuration](#!/guide/dev_configuration).

To open the toolbar configurator, go to the `/samples/` folder of your CKEditor installation and open the `index.html` file in your browser. You should be able to see a working CKEditor sample which confirms that the installation succeeded.

Click the **Toolbar Configurator** button in the top right-hand corner of the sample page to proceed to editing your toolbar.

{@img ckeditor-4.5-sample.png New CKEditor 4.5 sample with Toolbar Configurator button}

There are two types of toolbar configurator available: the **basic**, more visual one and the **advanced** one. The editor shown in the toolbar configurator contains all the features and buttons available in a particular CKEditor build.

### Basic Toolbar Configurator

The basic toolbar configurator uses the "[toolbar groups](#!/guide/dev_toolbar-section-toolbar-groups-configuration)" approach which is the recommended way to arrange the editor toolbar. You can modify the order of the toolbar groups by clicking the Up and Down arrows and toggle button visibility by selecting and deselecting the checkboxes. Use the "Add row separator" button to create a new toolbar row.

{@img toolbar_configurator_basic.png CKEditor 4.5 basic toolbar configurator}

When you are happy with your toolbar, click the "Get toolbar config" button to display the generated toolbar configuration. Add your new toolbar code to your [editor configuration](#!/guide/dev_configuration) &mdash; if you have already changed some other configuration options, do remember to merge both configurations. Last but not least, **clear your browser cache** after any configuration change!

### Advanced Toolbar Configurator

The basic, more visual toolbar configurator is based on the "toolbar groups" concept. However, if you would like to create a completely custom toolbar with an "[item by item](#!/guide/dev_toolbar-section-%22item-by-item%22-configuration)" configuration, and precisely define the visibility and position of each toolbar button, you can achieve this with the advanced toolbar configurator.

{@img toolbar_configurator_advanced.png CKEditor 4.5 advanced toolbar configurator}

In this case you start with a CKEditor instance and a code editor with current toolbar configuration. You can manually edit the toolbar code in the code editor and the toolbar preview will be updated live as you type. Unused toolbar items available in your editor configuration are listed on the right to make it easier to add them back should you wish to do so.

When you are happy with your toolbar, copy the modified toolbar configuration from the code editor. Add your new toolbar code to your [editor configuration](#!/guide/dev_configuration) &mdash; if you have already changed some other configuration options, do remember to merge both configurations. Last but not least, **clear your browser cache** after any configuration change!

## Toolbar Groups Configuration

**Note:** This approach is used in the [basic mode of the toolbar configurator](#!/guide/dev_toolbar-section-basic-toolbar-configurator), which is a much more recommended method to customize the editor toolbar. If you do not want to use the toolbar configurator, this method requires manual crafting of the toolbar configuration code and is recommended to more advanced users.

CKEditor 4 introduced a new concept for toolbar organization which is based on "grouping" instead of the traditional "item by item positioning" way.

Grouping configuration is defined by the CKEDITOR.config.toolbarGroups setting. The following is the configuration used by the Standard distribution of CKEditor:

	config.toolbarGroups = [
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'forms' },
		{ name: 'tools' },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'others' },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align' ] },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'about' }
	];

It is a list (`Array`) of objects, each one with a `name` (e.g `clipboard` or `links`) and a optional "sub-groups" list.

### Changing the Groups Order

You can easily customize the group ordering and position by simply changing the above configuration.

You can force row-breaks in the toolbar by adding `'/'` into the list, just like you could see above.

Note that there are unused groups in the above configuration. This is "by design" (see "The Benefits of Group Configuration").

### The Benefits of Group Configuration

The most important benefit of toolbar grouping configuration over the "item by item" configuration is: **automation**.

It is now possible for plugin developers to define into which toolbar group their plugins should add buttons. For example, the Image plugin, includes its button in the `insert` group, while the Undo and Redo buttons go into the `undo` sub-group.

While not mandatory, having all groups and sub-groups configured (including the ones that you do not use) is recommended because at any moment in the future, when a new plugin gets installed, its button will automatically appear in the toolbar without further configuration requirements.

### The Drawbacks of Group Configuration

The most evident problem with grouping configuration is that it is not possible to precisely control where each item is placed in the toolbar. A plugin author can influence it when [creating the toolbar button](#!/api/CKEDITOR.ui-method-addButton), but it is entirely optional and cannot be easily configured by the developer customizing their CKEditor instance.

## "Item by Item" Configuration

**Note:** This approach is used in the [advanced mode of the toolbar configurator](#!/guide/dev_toolbar-section-advanced-toolbar-configurator), which is a much more recommended method to customize the editor toolbar. If you do not want to use the toolbar configurator, this method requires manual crafting of the toolbar configuration code and is recommended to more advanced users.

Other than the grouping configuration, it is also possible to have more control over every single element in the toolbar by defining their precise position. That is done by configuring a "toolbar definition".

A toolbar definition is a JavaScript array that contains the elements to
be displayed in all **toolbar rows** available in the editor. The following is an example:

	config.toolbar = [
		{ name: 'document', items: [ 'Source', '-', 'NewPage', 'Preview', '-', 'Templates' ] },
		{ name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
		'/',
		{ name: 'basicstyles', items: [ 'Bold', 'Italic' ] }
	];

Here every toolbar group is given a name and a precise list of items is defined for each group.

The above can also be achieved with a simpler syntax (see "Accessibility Concerns" later on):

	config.toolbar = [
		[ 'Source', '-', 'NewPage', 'Preview', '-', 'Templates' ],
		[ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ],
		'/',
		[ 'Bold', 'Italic' ]
	];

Item separator can be included by adding `'-'` (dash) to the list of items, as seen above.

You can force row-breaks in the toolbar by adding `'/'` between groups. These separators can be used to force a
break at the point where they were placed, rendering the next toolbar group in a new row.

### The Benefits of "Item by Item" Configuration

The most evident benefit of this kind of configuration is that the position of every single item in the toolbar is under control.

### The Drawbacks of "Item by Item" Configuration

The biggest problem it that there will be no automation when new plugins get installed. This means that if a new plugin gets into your editor, you will have to manually change your configuration to include the plugin buttons.

## Accessibility Concerns

The `name` given for every toolbar group is used by assistive technologies such as screen
readers. That name will be used by CKEditor to search for the "readable" name of each toolbar group in the editor language files (the `toolbarGroups` entries).

Screen readers will announce each of the toolbar groups by using either their readable name (if it is available) or their defined `name` attribute.

## Custom Toolbar Demo 

See the [working "Custom Editor Toolbar" sample](http://sdk.ckeditor.com/samples/toolbar.html) that showcases an editor instance with a one-row toolbar set to include just a few most relevant editing features.

## Related Features

Refer to the following resources for more information about editor toolbar:

 * The [Toolbar Location](#!/guide/dev_toolbarlocation) feature lets you change the toolbar position in classic editor.
 * The [Shared Toolbar and Bottom Bar](#!/guide/dev_sharedspace) feature lets you place the toolbar in a designated page element and share it among multiple editor instances used on one page.