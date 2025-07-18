(function ($) {
    'use strict';
    
    var defaultOptions = {};

    // Utility: Build dropdown options for templates
    function buildTemplateOptions(templates) {
        return templates.map(function(t, i) {
            return '<option value="' + i + '">' + $('<div>').text(t.name).html() + '</option>';
        }).join('');
    }

    // SVG arrow for dropdown (matches Trumbowyg style)
    var arrowSvg = '<svg style="width:12px;height:12px;vertical-align:middle;margin-left:3px;" viewBox="0 0 24 24"><path fill="currentColor" d="M7 10l5 5 5-5z"/></svg>';

    // Register plugin in Trumbowyg
    $.extend(true, $.trumbowyg, {
        langs: {
            en: {
                templateOptions: 'Template Options',
                saveTemplate: 'Save',
                editTemplate: 'Update',
                deleteTemplate: 'Delete',
                backupTemplate: 'Backup'
            }
        },
        plugins: {
            templateoptions: { 
                init: function (trumbowyg) {
                    trumbowyg.o.plugins.templateoptions = $.extend(true, {}, defaultOptions, trumbowyg.o.plugins.templateoptions || {});
                    // Register the dropdown button
                    trumbowyg.addBtnDef('templateOptions', {
                        fn: function () {
                            var btnName = 'templateOptions';
                            var dropdownPrefix = trumbowyg.o.prefix + 'dropdown',
                                dropdownOptions = {
                                    class: dropdownPrefix + '-' + btnName + ' ' + dropdownPrefix + ' ' + trumbowyg.o.prefix + 'fixed-top'
                                };
                            dropdownOptions['data-' + dropdownPrefix] = btnName;
                            var $dropdown = $('<div/>', dropdownOptions);

                            if (trumbowyg.$box.find('.' + dropdownPrefix + '-' + btnName).length === 0) {
                                trumbowyg.$box.append($dropdown.hide());
                            } else {
                                $dropdown = trumbowyg.$box.find('.' + dropdownPrefix + '-' + btnName);
                            }

                            // Clear dropdown
                            $dropdown.html('');

                            // Add each template action as a button in the dropdown
                            var actions = [
                                { btn: 'saveTemplateOptions', label: trumbowyg.lang.saveTemplate },
                                { btn: 'editTemplateOptions', label: trumbowyg.lang.editTemplate },
                                { btn: 'deleteTemplateOptions', label: trumbowyg.lang.deleteTemplate },
                                { btn: 'backupTemplatesOptions', label: trumbowyg.lang.backupTemplate }
                            ];
                            actions.forEach(function(action) {
                                $dropdown.append(trumbowyg.buildSubBtn(action.btn));
                            });

                            trumbowyg.dropdown(btnName);
                        },
                        hasIcon: false,
                        text: trumbowyg.lang.templateOptions + arrowSvg // Add arrow to button text
                    });

                    // Register the action buttons
                    trumbowyg.addBtnDef('saveTemplateOptions', saveTemplateOptionsBtn(trumbowyg));
                    trumbowyg.addBtnDef('editTemplateOptions', editTemplateOptionsBtn(trumbowyg));
                    trumbowyg.addBtnDef('deleteTemplateOptions', deleteTemplateOptionsBtn(trumbowyg));
                    trumbowyg.addBtnDef('backupTemplatesOptions', backupTemplatesOptionsBtn(trumbowyg));
                }
            }
        }
    });

    // Template selector for dropdown (if needed elsewhere)
    function templateOptionsSelector(trumbowyg) {
        var templates = JSON.parse(localStorage.getItem('myTemplateSave') || '[]');
        var dropdown = [];
        templates.forEach(function(template, idx) {
            var btnName = 'templateoptions_' + idx;
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
    function saveTemplateOptionsBtn(trumbowyg) {
        return {
            fn: function () {
                var editorContent = trumbowyg.html();
                var modalContent = `
                    <div style="font-size:0.85em;color:#888;margin-bottom:8px;">
                        Create a new template from current content. Template name is required.
                    </div>
                    <p>Template name: <input type="text" id="tbw-template-name" style="width: 90%"></p>
                `;
                var $modal = trumbowyg.$ed.trumbowyg('openModal', {
                    title: 'Create a new template',
                    content: modalContent
                });

                $modal.on('tbwconfirm', function () {
                    var templateName = $modal.find('#tbw-template-name').val().trim();
                    if (!templateName) {
                        // Send message to parent window
                        if (window.parent && window.parent !== window) {
                            window.parent.postMessage({
                                type: 'showNotification',
                                title: 'Template Name Required',
                                message: 'Please enter a name for the template.',
                                messageType: 'error'
                            }, '*');
                        } else {
                            alert("Template name is required.");
                        }
                        return false;
                    }
                    var htmlContent = editorContent;
                    var templates = JSON.parse(localStorage.getItem('myTemplateSave') || '[]');
                    var newTemplate = {
                        name: templateName,
                        html: htmlContent
                    };
                    templates.push(newTemplate);
                    localStorage.setItem('myTemplateSave', JSON.stringify(templates));
                    // Send message to parent window
                    if (window.parent && window.parent !== window) {
                        window.parent.postMessage({
                            type: 'showNotification',
                            title: 'Template Saved',
                            message: `The template "${templateName}" has been created!`,
                            messageType: 'success'
                        }, '*');
                    } else {
                        alert('Template saved!');
                    }
                    trumbowyg.$ed.trumbowyg('closeModal');
                });

                $modal.on('tbwcancel', function () {
                    trumbowyg.$ed.trumbowyg('closeModal');
                });
            },
            hasIcon: false,
            text: 'Create Template'
        };
    }

    // Edit Template button
    function editTemplateOptionsBtn(trumbowyg) {
        return {
            fn: function () {
                var templates = JSON.parse(localStorage.getItem('myTemplateSave') || '[]');
                if (!templates.length) {
                    // Send message to parent window
                    if (window.parent && window.parent !== window) {
                        window.parent.postMessage({
                            type: 'showNotification',
                            title: 'No Templates',
                            message: 'There are no templates to edit.',
                            messageType: 'info'
                        }, '*');
                    } else {
                        alert('No templates to edit.');
                    }
                    return;
                }
                var options = buildTemplateOptions(templates);

                // Modal content with hidden new name input
                var modalContent = `
                    <div style="font-size:0.85em;color:#888;margin-bottom:8px;">
                        This will replace the template with current content.
                    </div>
                    <p>Select template to update: 
                        <select id="tbw-template-select" style="width:90%">${options}</select>
                    </p>
                    <div id="tbw-change-name-container" style="margin-bottom:8px;">
                        <button type="button" id="tbw-change-name-btn" style="margin-top:4px;">Change template name</button>
                    </div>
                    <div id="tbw-new-name-row" style="display:none;">
                        <p>New Template name: 
                            <input type="text" id="tbw-template-edit-name" style="width:90%">
                        </p>
                    </div>
                `;

                var $modal = trumbowyg.$ed.trumbowyg('openModal', {
                    title: 'Update template',
                    content: modalContent
                });

                // Set initial name in hidden input
                function updateNameField() {
                    var idx = $modal.find('#tbw-template-select').val();
                    $modal.find('#tbw-template-edit-name').val(templates[idx].name);
                }
                $modal.find('#tbw-template-select').on('change', updateNameField);
                updateNameField();

                // Show new name input when button is clicked
                $modal.find('#tbw-change-name-btn').on('click', function() {
                    $modal.find('#tbw-new-name-row').show();
                    $modal.find('#tbw-template-edit-name').focus();
                    $(this).hide();
                });

                $modal.on('tbwconfirm', function () {
                    var idx = $modal.find('#tbw-template-select').val();
                    var newName;
                    if ($modal.find('#tbw-new-name-row').is(':visible')) {
                        newName = $modal.find('#tbw-template-edit-name').val().trim();
                        if (!newName) {
                            // Send message to parent window
                            if (window.parent && window.parent !== window) {
                                window.parent.postMessage({
                                    type: 'showNotification',
                                    title: 'Template Name Required',
                                    message: 'Please enter a name for the template.',
                                    messageType: 'error'
                                }, '*');
                            } else {
                                alert("Template name is required.");
                            }
                            return false;
                        }
                    } else {
                        newName = templates[idx].name;
                    }
                    var htmlContent = trumbowyg.html();
                    templates[idx] = {
                        name: newName,
                        html: htmlContent
                    };
                    localStorage.setItem('myTemplateSave', JSON.stringify(templates));
                    // Send message to parent window
                    if (window.parent && window.parent !== window) {
                        window.parent.postMessage({
                            type: 'showNotification',
                            title: 'Template Updated',
                            message: `The template "${newName}" has been updated successfully!`,
                            messageType: 'success'
                        }, '*');
                    } else {
                        alert('Template updated!');
                    }
                    trumbowyg.$ed.trumbowyg('closeModal');
                });

                $modal.on('tbwcancel', function () {
                    trumbowyg.$ed.trumbowyg('closeModal');
                });
            },
            hasIcon: false,
            text: 'Update Template'
        };
    }

    // Delete Template button
    function deleteTemplateOptionsBtn(trumbowyg) {
        return {
            fn: function () {
                var templates = JSON.parse(localStorage.getItem('myTemplateSave') || '[]');
                var options = buildTemplateOptions(templates); 
                if (!templates.length) {
                    // Send message to parent window
                    if (window.parent && window.parent !== window) {
                        window.parent.postMessage({
                            type: 'showNotification',
                            title: 'No Templates',
                            message: 'There are no templates to delete.',
                            messageType: 'info'
                        }, '*');
                    } else {
                        alert('No templates to delete.');
                    }
                    return;
                }
                var modalContent = `
                    <div style="font-size:0.85em;color:#888;margin-bottom:8px;">
                        This will permanently remove the selected template.
                    </div>
                    <p>Select a template to delete: <select id="tbw-template-delete-select" style="width:90%">${options}</select></p>
                `;

                var $modal = trumbowyg.$ed.trumbowyg('openModal', {
                    title: 'Delete Template',
                    content: modalContent
                });

                $modal.on('tbwconfirm', function () {
                    var idx = $modal.find('#tbw-template-delete-select').val();
                    var deletedTemplateName = templates[idx].name;
                    if (!confirm('Delete template "' + deletedTemplateName + '"?')) return false;
                    templates.splice(idx, 1);
                    localStorage.setItem('myTemplateSave', JSON.stringify(templates));
                    // Send message to parent window
                    if (window.parent && window.parent !== window) {
                        window.parent.postMessage({
                            type: 'showNotification',
                            title: 'Template Deleted',
                            message: `The template "${deletedTemplateName}" has been deleted!`,
                            messageType: 'success'
                        }, '*');
                    } else {
                        alert('Template deleted!');
                    }
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

    // Backup Templates button
    function backupTemplatesOptionsBtn(trumbowyg) {
        return {
            fn: function () {
                // Default filename: YYYYMMDD-HHMMSS.json
                var now = new Date();
                var pad = n => n < 10 ? '0' + n : n;
                var defaultName = 'mytemplates' + now.getFullYear().toString() +
                    pad(now.getMonth() + 1) +
                    pad(now.getDate()) + '-' +
                    pad(now.getHours()) +
                    pad(now.getMinutes()) +
                    pad(now.getSeconds()) + '.json';
                var modalContent = `
                    <div style="font-size:0.85em;color:#888;margin-bottom:8px;">
                        This will download all templates as a JSON file.
                    </div>
                    <p>File name: <input type="text" id="tbw-backup-filename" style="width: 90%" value="${defaultName}"></p>
                `;

                var $modal = trumbowyg.$ed.trumbowyg('openModal', {
                    title: 'Backup Templates',
                    content: modalContent
                });

                $modal.on('tbwconfirm', function () {
                    var filename = $modal.find('#tbw-backup-filename').val().trim() || defaultName;
                    var templates = JSON.parse(localStorage.getItem('myTemplateSave') || '[]');
                    var blob = new Blob([JSON.stringify(templates, null, 2)], {type: "application/json"});
                    var a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    trumbowyg.$ed.trumbowyg('closeModal');
                });

                $modal.on('tbwcancel', function () {
                    trumbowyg.$ed.trumbowyg('closeModal');
                });
            },
            hasIcon: false,
            text: 'Backup Templates'
        };
    }
})(jQuery);
