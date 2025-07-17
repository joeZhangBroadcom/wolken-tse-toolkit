(function ($) {
    'use strict';

    // Adds the language variables
    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                template: 'Template'
            },
            az: {
                template: 'Şablon'
            },
            by: {
                template: 'Шаблон'
            },
            da: {
                template: 'Skabelon'
            },
            de: {
                template: 'Vorlage'
            },
            et: {
                template: 'Mall'
            },
            fr: {
                template: 'Patron'
            },
            hu: {
                template: 'Sablon'
            },
            ja: {
                template: 'テンプレート'
            },
            ko: {
                template: '서식'
            },
            nl: {
                template: 'Sjabloon'
            },
            pt_br: {
                template: 'Modelo'
            },
            ru: {
                template: 'Шаблон'
            },
            sl: {
                template: 'Predloga'
            },
            tr: {
                template: 'Şablon'
            },
            zh_tw: {
                template: '模板',
            },
            // jshint camelcase:true
        }
    });

    // Adds the extra button definition
    $.extend(true, $.trumbowyg, {
        plugins: {
            template: {
                shouldInit: function (trumbowyg) {
                    // Always initialize to allow localStorage usage
                    return true;
                },
                init: function (trumbowyg) {
                    trumbowyg.addBtnDef('template', {
                        fn: function () {
                            // Force rebuild of dropdown each time button is clicked
                            var dropdownName = 'template';
                            var $dropdown = $('[data-' + trumbowyg.o.prefix + 'dropdown=' + dropdownName + ']', trumbowyg.$box);
                            
                            // Always rebuild the dropdown
                            if ($dropdown.length > 0) {
                                $dropdown.remove();
                            }
                            
                            // Clean up old template buttons
                            for (var key in trumbowyg.btnsDef) {
                                if (key.indexOf('template_') === 0) {
                                    delete trumbowyg.btnsDef[key];
                                }
                            }
                            
                            // Build fresh dropdown from localStorage
                            var dropdownItems = templateSelector(trumbowyg);
                            
                            // Update the button definition with new dropdown
                            trumbowyg.btnsDef.template.dropdown = dropdownItems;
                            
                            // Build the dropdown HTML
                            if (dropdownItems.length > 0) {
                                var dropdownClass = trumbowyg.o.prefix + 'dropdown';
                                var dropdownOptions = {
                                    class: dropdownClass + '-' + dropdownName + ' ' + dropdownClass + ' ' + trumbowyg.o.prefix + 'fixed-top'
                                };
                                dropdownOptions['data-' + dropdownClass] = dropdownName;
                                
                                var $newDropdown = $('<div/>', dropdownOptions);
                                
                                $.each(dropdownItems, function(idx, btnName) {
                                    if (trumbowyg.btnsDef[btnName] && trumbowyg.isSupportedBtn(btnName)) {
                                        $newDropdown.append(trumbowyg.buildSubBtn(btnName));
                                    }
                                });
                                
                                trumbowyg.$box.append($newDropdown.hide());
                            }
                            
                            // Show the dropdown
                            trumbowyg.dropdown('template');
                        },
                        hasIcon: false,
                        text: trumbowyg.lang.template
                    });
                }
            }
        }
    });

    // Creates the template-selector dropdown from localStorage
    function templateSelector(trumbowyg) {
        // Read templates from localStorage instead of plugin config
        var savedTemplates = JSON.parse(localStorage.getItem('myTemplateSave') || '[]');
        var templates = [];

        $.each(savedTemplates, function (index, template) {
            var btnName = 'template_' + index;
            trumbowyg.addBtnDef(btnName, {
                fn: function () {
                    // Read fresh from localStorage when clicked
                    var currentTemplates = JSON.parse(localStorage.getItem('myTemplateSave') || '[]');
                    if (currentTemplates[index]) {
                        trumbowyg.html(currentTemplates[index].html);
                    }
                },
                hasIcon: false,
                title: template.name
            });
            templates.push(btnName);
        });

        return templates;
    }
})(jQuery);