(function ($) {
    'use strict';
    console.log("Template Plus plugin loaded");

    // Language support
    $.extend(true, $.trumbowyg, {
        langs: {
            en: {
                templateplus: 'Template Plus',
                saveTemplate: 'Save Template',
                editTemplate: 'Edit Template',
                deleteTemplate: 'Delete Template'
            },
            // ...other languages, update key to templateplus if needed...
        }
    });

    // Utility: Build dropdown options for templates
    function buildTemplateOptions(templates) {
        return templates.map(function(t, i) {
            return '<option value="' + i + '">' + $('<div>').text(t.name).html() + '</option>';
        }).join('');
    }

    // Template selector for dropdown
    function templatePlusSelector(trumbowyg) {
        var templates = JSON.parse(localStorage.getItem('trumbowygTemplatesPlus') || '[]');
        var dropdown = [];
        templates.forEach(function(template, idx) {
            var btnName = 'templateplus_' + idx;
            trumbowyg.addBtnDef(btnName, {
                fn: function () {
                    trumbowyg.html(template.html);
                },
                hasIcon: false,
                title: template.name
            });
            dropdown.push(btnName);
        });
        return dropdown;
    }

    // Save Template button
    function saveTemplatePlusBtn(trumbowyg) {
        return {
            fn: function () {
                var editorContent = trumbowyg.html();
                var $modal = trumbowyg.$ed.trumbowyg('openModal', {
                    title: 'Save Template',
                    content: '<p>Template name: <input type="text" id="tbw-template-name" style="width: 90%"></p>'
                });

                $modal.on('tbwconfirm', function () {
                    var templateName = $modal.find('#tbw-template-name').val().trim();
                    if (!templateName) {
                        alert("Template name is required.");
                        return false;
                    }
                    var htmlContent = editorContent;
                    var templates = JSON.parse(localStorage.getItem('trumbowygTemplatesPlus') || '[]');
                    var newTemplate = {
                        name: templateName,
                        html: htmlContent
                    };
                    templates.push(newTemplate);
                    localStorage.setItem('trumbowygTemplatesPlus', JSON.stringify(templates));
                    if (typeof saveJSONToFile === 'function') {
                        saveJSONToFile(templates, 'myTemplatePlus-' + (window.moment ? moment() : Date.now()) + '.json');
                    }
                    alert('Template saved!');
                    trumbowyg.$ed.trumbowyg('closeModal');
                });

                $modal.on('tbwcancel', function () {
                    trumbowyg.$ed.trumbowyg('closeModal');
                });
            },
            hasIcon: false,
            text: 'Save Template'
        };
    }

    // Edit Template button
    function editTemplatePlusBtn(trumbowyg) {
        return {
            fn: function () {
                var templates = JSON.parse(localStorage.getItem('trumbowygTemplatesPlus') || '[]');
                if (!templates.length) return alert('No templates to edit.');
                var options = buildTemplateOptions(templates);
                var $modal = trumbowyg.$ed.trumbowyg('openModal', {
                    title: 'Edit Template',
                    content: '<p>Select template: <select id="tbw-template-select" style="width:90%">' + options + '</select></p>' +
                             '<p>Template name: <input type="text" id="tbw-template-edit-name" style="width:90%"></p>'
                });

                function updateNameField() {
                    var idx = $modal.find('#tbw-template-select').val();
                    $modal.find('#tbw-template-edit-name').val(templates[idx].name);
                }
                $modal.find('#tbw-template-select').on('change', updateNameField);
                updateNameField();

                $modal.on('tbwconfirm', function () {
                    var idx = $modal.find('#tbw-template-select').val();
                    var newName = $modal.find('#tbw-template-edit-name').val().trim();
                    if (!newName) {
                        alert("Template name is required.");
                        return false;
                    }
                    var htmlContent = trumbowyg.html();
                    templates[idx] = {
                        name: newName,
                        html: htmlContent
                    };
                    localStorage.setItem('trumbowygTemplatesPlus', JSON.stringify(templates));
                    if (typeof saveJSONToFile === 'function') {
                        saveJSONToFile(templates, 'myTemplatePlus-' + (window.moment ? moment() : Date.now()) + '.json');
                    }
                    alert('Template updated!');
                    trumbowyg.$ed.trumbowyg('closeModal');
                });

                $modal.on('tbwcancel', function () {
                    trumbowyg.$ed.trumbowyg('closeModal');
                });
            },
            hasIcon: false,
            text: 'Edit Template'
        };
    }

    // Delete Template button
    function deleteTemplatePlusBtn(trumbowyg) {
        return {
            fn: function () {
                var templates = JSON.parse(localStorage.getItem('trumbowygTemplatesPlus') || '[]');
                if (!templates.length) return alert('No templates to delete.');
                var options = buildTemplateOptions(templates);
                var $modal = trumbowyg.$ed.trumbowyg('openModal', {
                    title: 'Delete Template',
                    content: '<p>Select template to delete: <select id="tbw-template-delete-select" style="width:90%">' + options + '</select></p>'
                });

                $modal.on('tbwconfirm', function () {
                    var idx = $modal.find('#tbw-template-delete-select').val();
                    if (!confirm('Delete template "' + templates[idx].name + '"?')) return false;
                    templates.splice(idx, 1);
                    localStorage.setItem('trumbowygTemplatesPlus', JSON.stringify(templates));
                    if (typeof saveJSONToFile === 'function') {
                        saveJSONToFile(templates, 'myTemplatePlus-' + (window.moment ? moment() : Date.now()) + '.json');
                    }
                    alert('Template deleted!');
                    trumbowyg.$ed.trumbowyg('closeModal');
                });

                $modal.on('tbwcancel', function () {
                    trumbowyg.$ed.trumbowyg('closeModal');
                });
            },
            hasIcon: false,
            text: 'Delete Template'
        };
    }

    // Register plugin in Trumbowyg
    $.extend(true, $.trumbowyg, {
        plugins: {
            templateplus: {
                init: function (trumbowyg) {
                    trumbowyg.addBtnDef('templateplus', {
                        dropdown: templatePlusSelector(trumbowyg),
                        hasIcon: false,
                        text: trumbowyg.lang.templateplus
                    });
                    trumbowyg.addBtnDef('saveTemplatePlus', saveTemplatePlusBtn(trumbowyg));
                    trumbowyg.addBtnDef('editTemplatePlus', editTemplatePlusBtn(trumbowyg));
                    trumbowyg.addBtnDef('deleteTemplatePlus', deleteTemplatePlusBtn(trumbowyg));
                }
            }
        }
    });
})(jQuery);
