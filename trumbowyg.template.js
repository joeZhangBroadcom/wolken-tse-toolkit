(function ($) {
    'use strict';

    // Language support
    $.extend(true, $.trumbowyg, {
        langs: {
            en: {
                template: 'Template',
                saveTemplate: 'Save Template',
                editTemplate: 'Edit Template',
                deleteTemplate: 'Delete Template'
            },
            az: { template: 'Şablon' },
            by: { template: 'Шаблон' },
            da: { template: 'Skabelon' },
            de: { template: 'Vorlage' },
            et: { template: 'Mall' },
            fr: { template: 'Patron' },
            hu: { template: 'Sablon' },
            ja: { template: 'テンプレート' },
            ko: { template: '서식' },
            nl: { template: 'Sjabloon' },
            pt_br: { template: 'Modelo' },
            ru: { template: 'Шаблон' },
            sl: { template: 'Predloga' },
            tr: { template: 'Şablon' },
            zh_tw: { template: '模板' }
        }
    });

    // Utility: Build dropdown options for templates
    function buildTemplateOptions(templates) {
        return templates.map(function(t, i) {
            return '<option value="' + i + '">' + $('<div>').text(t.name).html() + '</option>';
        }).join('');
    }

    // Template selector for dropdown
    function templateSelector(trumbowyg) {
        var templates = JSON.parse(localStorage.getItem('trumbowygTemplates') || '[]');
        var dropdown = [];
        templates.forEach(function(template, idx) {
            var btnName = 'template_' + idx;
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
    function saveTemplateBtn(trumbowyg) {
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
                    var templates = JSON.parse(localStorage.getItem('trumbowygTemplates') || '[]');
                    var newTemplate = {
                        name: templateName,
                        html: htmlContent
                    };
                    templates.push(newTemplate);
                    localStorage.setItem('trumbowygTemplates', JSON.stringify(templates));
                    if (typeof saveJSONToFile === 'function') {
                        saveJSONToFile(templates, 'myTemplate-' + (window.moment ? moment() : Date.now()) + '.json');
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
    function editTemplateBtn(trumbowyg) {
        return {
            fn: function () {
                var templates = JSON.parse(localStorage.getItem('trumbowygTemplates') || '[]');
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
                    localStorage.setItem('trumbowygTemplates', JSON.stringify(templates));
                    if (typeof saveJSONToFile === 'function') {
                        saveJSONToFile(templates, 'myTemplate-' + (window.moment ? moment() : Date.now()) + '.json');
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
    function deleteTemplateBtn(trumbowyg) {
        return {
            fn: function () {
                var templates = JSON.parse(localStorage.getItem('trumbowygTemplates') || '[]');
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
                    localStorage.setItem('trumbowygTemplates', JSON.stringify(templates));
                    if (typeof saveJSONToFile === 'function') {
                        saveJSONToFile(templates, 'myTemplate-' + (window.moment ? moment() : Date.now()) + '.json');
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
            template: {
                init: function (trumbowyg) {
                    trumbowyg.addBtnDef('template', {
                        dropdown: templateSelector(trumbowyg),
                        hasIcon: false,
                        text: trumbowyg.lang.template
                    });
                    trumbowyg.addBtnDef('saveTemplate', saveTemplateBtn(trumbowyg));
                    trumbowyg.addBtnDef('editTemplate', editTemplateBtn(trumbowyg));
                    trumbowyg.addBtnDef('deleteTemplate', deleteTemplateBtn(trumbowyg));
                }
            }
        }
    });
})(jQuery);
