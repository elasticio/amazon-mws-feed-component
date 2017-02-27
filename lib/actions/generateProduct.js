/*eslint no-invalid-this:0 */
'use strict';
// var elasticio = require("elasticio-node");
// var messages = elasticio.messages;

module.exports.process = processAction;
module.exports.getMetaModel = getMetaModel;

/**
 * This method will be called from elastic.io platform providing following data
 *
 * @param msg incoming message object that contains ``body`` with payload
 * @param cfg configuration that is account information and configuration field values
 */
function processAction(msg, cfg) {
    this.emit('end');
}

/**
 * This function is called at design time when dynamic metadata need
 * to be fetched from 3rd party system
 *
 * @param cfg - configuration object same as in process method above
 * @param cb - callback returning metadata
 */
function getMetaModel(cfg, cb) {
    console.log('Fetching metadata with following configuration cfg=%j', cfg);
  // Here we return metadata in the same format as
  // it is configured in component.json
    cb(null, {
        in: {
            type: 'object',
            properties: {
                sku: {
                    required: true,
                    type: 'string',
                    title: 'SKU'
                },
                standardProductID: {
                    required: false,
                    type: 'object',
                    title: 'StandardProductID',
                    properties: {
                        type: {
                            required: true,
                            type: 'string',
                            title: 'Type',
                            enum: [
                                'ISBN',
                                'UPC',
                                'EAN',
                                'ASIN',
                                'GTIN',
                                'GCID',
                                'PZN'
                            ]
                        },
                        value: {
                            required: true,
                            type: 'string',
                            title: 'Value'
                        }
                    }
                },
                gtinExemptionReason: {
                    required: false,
                    type: 'string',
                    title: 'GtinExemptionReason',
                    enum: [
                        'bundle',
                        'part'
                    ]
                },
                relatedProductID: {
                    required: false,
                    type: 'object',
                    title: 'RelatedProductID',
                    properties: {
                        type: {
                            required: true,
                            type: 'string',
                            title: 'Type',
                            enum: [
                                'UPC',
                                'EAN',
                                'GTIN'
                            ]
                        },
                        value: {
                            required: true,
                            type: 'string',
                            title: 'Value'
                        }
                    }
                },
                productTaxCode: {
                    required: false,
                    type: 'string',
                    title: 'ProductTaxCode'
                },
                launchDate: {
                    required: false,
                    type: 'date',
                    title: 'LaunchDate'
                },
                discontinueDate: {
                    required: false,
                    type: 'date',
                    title: 'DiscontinueDate'
                },
                releaseDate: {
                    required: false,
                    type: 'date',
                    title: 'ReleaseDate'
                },
                externalProductUrl: {
                    required: false,
                    type: 'string',
                    title: 'ExternalProductUrl'
                },
                offAmazonChannel: {
                    required: false,
                    type: 'string',
                    title: 'OffAmazonChannel',
                    enum: [
                        'advertise',
                        'exclude'
                    ]
                },
                onAmazonChannel: {
                    required: false,
                    type: 'string',
                    title: 'OnAmazonChannel',
                    enum: [
                        'sell',
                        'advertise',
                        'exclude'
                    ]
                },
                condition: {
                    required: false,
                    type: 'object',
                    title: 'Condition',
                    properties: {
                        conditionType: {
                            required: true,
                            type: 'string',
                            title: 'ConditionType',
                            enum: [
                                'New',
                                'UsedLikeNew',
                                'UsedVeryGood',
                                'UsedGood',
                                'UsedAcceptable',
                                'CollectibleLikeNew',
                                'CollectibleVeryGood',
                                'CollectibleGood',
                                'CollectibleAcceptable',
                                'Refurbished',
                                'Club'
                            ]
                        },
                        conditionNote: {
                            required: false,
                            type: 'string',
                            title: 'ConditionNote'
                        }
                    }
                },
                rebate: {
                    required: false,
                    type: 'object',
                    title: 'Rebate',
                    properties: {
                        rebateStartDate: {
                            required: true,
                            type: 'date',
                            title: 'RebateStartDate'
                        },
                        rebateEndDate: {
                            required: true,
                            type: 'date',
                            title: 'RebateEndDate'
                        },
                        rebateMessage: {
                            required: true,
                            type: 'string',
                            title: 'RebateMessage'
                        },
                        rebateName: {
                            required: true,
                            type: 'string',
                            title: 'RebateName'
                        }
                    }
                },
                itemPackageQuantity: {
                    required: false,
                    type: 'number',
                    title: 'ItemPackageQuantity'
                },
                numberOfItems: {
                    required: false,
                    type: 'number',
                    title: 'NumberOfItems'
                },
                liquidVolume: {
                    required: false,
                    type: 'object',
                    title: 'LiquidVolume',
                    properties: {
                        value: {
                            required: false,
                            type: 'number'
                        },
                        unitOfMeasure: {
                            required: true,
                            enum: [
                                'cubic-cm',
                                'cubic-ft',
                                'cubic-in',
                                'cubic-m',
                                'cubic-yd',
                                'cup',
                                'fluid-oz',
                                'gallon',
                                'liter',
                                'milliliter',
                                'ounce',
                                'pint',
                                'quart',
                                'liters',
                                'deciliters',
                                'centiliters',
                                'milliliters',
                                'microliters',
                                'nanoliters',
                                'picoliters'
                            ]
                        }
                    }
                },
                descriptionData: {
                    required: false,
                    type: 'object',
                    title: 'DescriptionData',
                    properties: {
                        title: {
                            required: true,
                            type: 'string',
                            title: 'Title'
                        },
                        brand: {
                            required: false,
                            type: 'string',
                            title: 'Brand'
                        },
                        designer: {
                            required: false,
                            type: 'string',
                            title: 'Designer'
                        },
                        description: {
                            required: false,
                            type: 'string',
                            title: 'Description'
                        },
                        bulletPoint: {
                            required: false,
                            type: 'string',
                            title: 'BulletPoint'
                        },
                        itemDimensions: {
                            required: false,
                            type: 'object',
                            title: 'ItemDimensions',
                            properties: {
                                length: {
                                    required: false,
                                    type: 'object',
                                    title: 'Length',
                                    properties: {
                                        value: {
                                            required: false,
                                            type: 'number'
                                        },
                                        unitOfMeasure: {
                                            required: true,
                                            enum: [
                                                'MM',
                                                'CM',
                                                'M',
                                                'IN',
                                                'FT',
                                                'inches',
                                                'feet',
                                                'meters',
                                                'decimeters',
                                                'centimeters',
                                                'millimeters',
                                                'micrometers',
                                                'nanometers',
                                                'picometers'
                                            ]
                                        }
                                    }
                                },
                                width: {
                                    required: false,
                                    type: 'object',
                                    title: 'Width',
                                    properties: {
                                        value: {
                                            required: false,
                                            type: 'number'
                                        },
                                        unitOfMeasure: {
                                            required: true,
                                            enum: [
                                                'MM',
                                                'CM',
                                                'M',
                                                'IN',
                                                'FT',
                                                'inches',
                                                'feet',
                                                'meters',
                                                'decimeters',
                                                'centimeters',
                                                'millimeters',
                                                'micrometers',
                                                'nanometers',
                                                'picometers'
                                            ]
                                        }
                                    }
                                },
                                height: {
                                    required: false,
                                    type: 'object',
                                    title: 'Height',
                                    properties: {
                                        value: {
                                            required: false,
                                            type: 'number'
                                        },
                                        unitOfMeasure: {
                                            required: true,
                                            enum: [
                                                'MM',
                                                'CM',
                                                'M',
                                                'IN',
                                                'FT',
                                                'inches',
                                                'feet',
                                                'meters',
                                                'decimeters',
                                                'centimeters',
                                                'millimeters',
                                                'micrometers',
                                                'nanometers',
                                                'picometers'
                                            ]
                                        }
                                    }
                                },
                                weight: {
                                    required: false,
                                    type: 'object',
                                    title: 'Weight',
                                    properties: {
                                        value: {
                                            required: false,
                                            type: 'number'
                                        },
                                        unitOfMeasure: {
                                            required: true,
                                            enum: [
                                                'GR',
                                                'KG',
                                                'OZ',
                                                'LB',
                                                'MG'
                                            ]
                                        }
                                    }
                                }
                            }
                        },
                        packageDimensions: {
                            required: false,
                            type: 'object',
                            title: 'PackageDimensions',
                            properties: {
                                length: {
                                    required: false,
                                    type: 'object',
                                    title: 'Length',
                                    properties: {
                                        value: {
                                            required: false,
                                            type: 'number'
                                        },
                                        unitOfMeasure: {
                                            required: true,
                                            enum: [
                                                'MM',
                                                'CM',
                                                'M',
                                                'IN',
                                                'FT',
                                                'inches',
                                                'feet',
                                                'meters',
                                                'decimeters',
                                                'centimeters',
                                                'millimeters',
                                                'micrometers',
                                                'nanometers',
                                                'picometers'
                                            ]
                                        }
                                    }
                                },
                                width: {
                                    required: false,
                                    type: 'object',
                                    title: 'Width',
                                    properties: {
                                        value: {
                                            required: false,
                                            type: 'number'
                                        },
                                        unitOfMeasure: {
                                            required: true,
                                            enum: [
                                                'MM',
                                                'CM',
                                                'M',
                                                'IN',
                                                'FT',
                                                'inches',
                                                'feet',
                                                'meters',
                                                'decimeters',
                                                'centimeters',
                                                'millimeters',
                                                'micrometers',
                                                'nanometers',
                                                'picometers'
                                            ]
                                        }
                                    }
                                },
                                height: {
                                    required: false,
                                    type: 'object',
                                    title: 'Height',
                                    properties: {
                                        value: {
                                            required: false,
                                            type: 'number'
                                        },
                                        unitOfMeasure: {
                                            required: true,
                                            enum: [
                                                'MM',
                                                'CM',
                                                'M',
                                                'IN',
                                                'FT',
                                                'inches',
                                                'feet',
                                                'meters',
                                                'decimeters',
                                                'centimeters',
                                                'millimeters',
                                                'micrometers',
                                                'nanometers',
                                                'picometers'
                                            ]
                                        }
                                    }
                                },
                                weight: {
                                    required: false,
                                    type: 'object',
                                    title: 'Weight',
                                    properties: {
                                        value: {
                                            required: false,
                                            type: 'number'
                                        },
                                        unitOfMeasure: {
                                            required: true,
                                            enum: [
                                                'GR',
                                                'KG',
                                                'OZ',
                                                'LB',
                                                'MG'
                                            ]
                                        }
                                    }
                                }
                            }
                        },
                        packageWeight: {
                            required: false,
                            type: 'object',
                            title: 'PackageWeight',
                            properties: {
                                value: {
                                    required: false,
                                    type: 'number'
                                },
                                unitOfMeasure: {
                                    required: true,
                                    enum: [
                                        'GR',
                                        'KG',
                                        'OZ',
                                        'LB',
                                        'MG'
                                    ]
                                }
                            }
                        },
                        shippingWeight: {
                            required: false,
                            type: 'object',
                            title: 'ShippingWeight',
                            properties: {
                                value: {
                                    required: false,
                                    type: 'number'
                                },
                                unitOfMeasure: {
                                    required: true,
                                    enum: [
                                        'GR',
                                        'KG',
                                        'OZ',
                                        'LB',
                                        'MG'
                                    ]
                                }
                            }
                        },
                        merchantCatalogNumber: {
                            required: false,
                            type: 'string',
                            title: 'MerchantCatalogNumber'
                        },
                        msrp: {
                            required: false,
                            type: 'object',
                            title: 'MSRP',
                            properties: {
                                value: {
                                    required: false,
                                    type: 'number'
                                },
                                currency: {
                                    required: true,
                                    enum: [
                                        'USD',
                                        'GBP',
                                        'EUR',
                                        'JPY',
                                        'CAD',
                                        'CNY',
                                        'INR',
                                        'MXN'
                                    ]
                                }
                            }
                        },
                        msrpWithTax: {
                            required: false,
                            type: 'object',
                            title: 'MSRPWithTax',
                            properties: {
                                value: {
                                    required: false,
                                    type: 'number'
                                },
                                currency: {
                                    required: true,
                                    enum: [
                                        'USD',
                                        'GBP',
                                        'EUR',
                                        'JPY',
                                        'CAD',
                                        'CNY',
                                        'INR',
                                        'MXN'
                                    ]
                                }
                            }
                        },
                        maxOrderQuantity: {
                            required: false,
                            type: 'number',
                            title: 'MaxOrderQuantity'
                        },
                        serialNumberRequired: {
                            required: false,
                            type: 'boolean',
                            title: 'SerialNumberRequired'
                        },
                        prop65: {
                            required: false,
                            type: 'boolean',
                            title: 'Prop65'
                        },
                        cpsiaWarning: {
                            required: false,
                            type: 'string',
                            title: 'CPSIAWarning',
                            enum: [
                                'choking_hazard_balloon',
                                'choking_hazard_contains_a_marble',
                                'choking_hazard_contains_small_ball',
                                'choking_hazard_is_a_marble',
                                'choking_hazard_is_a_small_ball',
                                'choking_hazard_small_parts',
                                'no_warning_applicable'
                            ]
                        },
                        cpsiaWarningDescription: {
                            required: false,
                            type: 'string',
                            title: 'CPSIAWarningDescription'
                        },
                        legalDisclaimer: {
                            required: false,
                            type: 'string',
                            title: 'LegalDisclaimer'
                        },
                        manufacturer: {
                            required: false,
                            type: 'string',
                            title: 'Manufacturer'
                        },
                        mfrPartNumber: {
                            required: false,
                            type: 'string',
                            title: 'MfrPartNumber'
                        },
                        searchTerms: {
                            required: false,
                            type: 'string',
                            title: 'SearchTerms'
                        },
                        platinumKeywords: {
                            required: false,
                            type: 'string',
                            title: 'PlatinumKeywords'
                        },
                        memorabilia: {
                            required: false,
                            type: 'boolean',
                            title: 'Memorabilia'
                        },
                        autographed: {
                            required: false,
                            type: 'boolean',
                            title: 'Autographed'
                        },
                        usedFor: {
                            required: false,
                            type: 'string',
                            title: 'UsedFor'
                        },
                        itemType: {
                            required: false,
                            type: 'string',
                            title: 'ItemType'
                        },
                        otherItemAttributes: {
                            required: false,
                            type: 'string',
                            title: 'OtherItemAttributes'
                        },
                        targetAudience: {
                            required: false,
                            type: 'string',
                            title: 'TargetAudience'
                        },
                        subjectContent: {
                            required: false,
                            type: 'string',
                            title: 'SubjectContent'
                        },
                        isGiftWrapAvailable: {
                            required: false,
                            type: 'boolean',
                            title: 'IsGiftWrapAvailable'
                        },
                        isGiftMessageAvailable: {
                            required: false,
                            type: 'boolean',
                            title: 'IsGiftMessageAvailable'
                        },
                        promotionKeywords: {
                            required: false,
                            type: 'string',
                            title: 'PromotionKeywords'
                        },
                        isDiscontinuedByManufacturer: {
                            required: false,
                            type: 'boolean',
                            title: 'IsDiscontinuedByManufacturer'
                        },
                        deliveryScheduleGroupID: {
                            required: false,
                            type: 'string',
                            title: 'DeliveryScheduleGroupID'
                        },
                        deliveryChannel: {
                            required: false,
                            type: 'string',
                            title: 'DeliveryChannel',
                            enum: [
                                'in_store',
                                'direct_ship'
                            ]
                        },
                        purchasingChannel: {
                            required: false,
                            type: 'string',
                            title: 'PurchasingChannel',
                            enum: [
                                'in_store',
                                'online'
                            ]
                        },
                        maxAggregateShipQuantity: {
                            required: false,
                            type: 'number',
                            title: 'MaxAggregateShipQuantity'
                        },
                        isCustomizable: {
                            required: false,
                            type: 'boolean',
                            title: 'IsCustomizable'
                        },
                        customizableTemplateName: {
                            required: false,
                            type: 'string',
                            title: 'CustomizableTemplateName'
                        },
                        recommendedBrowseNode: {
                            required: false,
                            type: 'number',
                            title: 'RecommendedBrowseNode'
                        },
                        merchantShippingGroupName: {
                            required: false,
                            type: 'string',
                            title: 'MerchantShippingGroupName'
                        },
                        fedasid: {
                            required: false,
                            type: 'string',
                            title: 'FEDAS_ID'
                        },
                        tsdAgeWarning: {
                            required: false,
                            type: 'string',
                            title: 'TSDAgeWarning',
                            enum: [
                                'not_suitable_under_36_months',
                                'not_suitable_under_3_years_supervision',
                                'not_suitable_under_4_years_supervision',
                                'not_suitable_under_5_years_supervision',
                                'not_suitable_under_6_years_supervision',
                                'not_suitable_under_7_years_supervision',
                                'not_suitable_under_8_years_supervision',
                                'not_suitable_under_9_years_supervision',
                                'not_suitable_under_10_years_supervision',
                                'not_suitable_under_11_years_supervision',
                                'not_suitable_under_12_years_supervision',
                                'not_suitable_under_13_years_supervision',
                                'not_suitable_under_14_years_supervision',
                                'no_warning_applicable'
                            ]
                        },
                        tsdWarning: {
                            required: false,
                            type: 'string',
                            title: 'TSDWarning',
                            enum: [
                                'only_domestic_use',
                                'adult_supervision_required',
                                'protective_equipment_required',
                                'water_adult_supervision_required',
                                'toy_inside',
                                'no_protective_equipment',
                                'risk_of_entanglement',
                                'fragrances_allergy_risk',
                                'no_warning_applicable'
                            ]
                        },
                        tsdLanguage: {
                            required: false,
                            type: 'string',
                            title: 'TSDLanguage',
                            enum: [
                                'English',
                                'French',
                                'German',
                                'Italian',
                                'Spanish',
                                'Dutch',
                                'Polish',
                                'Bulgarian',
                                'Czech',
                                'Danish',
                                'Estonian',
                                'Finnish',
                                'Greek',
                                'Hungarian',
                                'Latvian',
                                'Lithuanian',
                                'Portuguese',
                                'Romanian',
                                'Slovak',
                                'Slovene',
                                'Swedish'
                            ]
                        },
                        optionalPaymentTypeExclusion: {
                            required: false,
                            type: 'string',
                            title: 'OptionalPaymentTypeExclusion',
                            enum: [
                                'cash_on_delivery',
                                'cvs',
                                'exclude_none',
                                'exclude cod',
                                'exclude cvs',
                                'exclude cod and cvs'
                            ]
                        },
                        distributionDesignation: {
                            required: false,
                            title: 'DistributionDesignation',
                            enum: [
                                'jp_parallel_import'
                            ]
                        }
                    }
                },
                promoTag: {
                    required: false,
                    type: 'object',
                    title: 'PromoTag',
                    properties: {
                        promoTagType: {
                            required: true,
                            type: 'string',
                            title: 'PromoTagType',
                            enum: [
                                'Sale',
                                'New',
                                'NewArrival',
                                'WebOnly',
                                'Clearance',
                                'LimitedOffer',
                                'SpecialOffer',
                                'SpecialPurchase',
                                'OnlyInStores'
                            ]
                        },
                        effectiveFromDate: {
                            required: true,
                            type: 'date',
                            title: 'EffectiveFromDate'
                        },
                        effectiveThroughDate: {
                            required: false,
                            type: 'date',
                            title: 'EffectiveThroughDate'
                        }
                    }
                },
                discoveryData: {
                    required: false,
                    type: 'object',
                    title: 'DiscoveryData',
                    properties: {
                        priority: {
                            required: false,
                            type: 'number',
                            title: 'Priority'
                        },
                        browseExclusion: {
                            required: false,
                            type: 'boolean',
                            title: 'BrowseExclusion'
                        },
                        recommendationExclusion: {
                            required: false,
                            type: 'boolean',
                            title: 'RecommendationExclusion'
                        }
                    }
                },
                productData: {
                    required: false,
                    type: 'object',
                    title: 'ProductData',
                    properties: {}
                },
                shippedByFreight: {
                    required: false,
                    type: 'boolean',
                    title: 'ShippedByFreight'
                },
                enhancedImageURL: {
                    required: false,
                    type: 'string',
                    title: 'EnhancedImageURL'
                },
                amazonVendorOnly: {
                    required: false,
                    type: 'object',
                    title: 'Amazon-Vendor-Only',
                    properties: {
                        cost: {
                            required: true,
                            type: 'object',
                            title: 'Cost',
                            properties: {
                                value: {
                                    required: false,
                                    type: 'number'
                                },
                                currency: {
                                    required: true,
                                    enum: [
                                        'USD',
                                        'GBP',
                                        'EUR',
                                        'JPY',
                                        'CAD',
                                        'CNY',
                                        'INR',
                                        'MXN'
                                    ]
                                }
                            }
                        }
                    }
                },
                amazonOnly: {
                    required: false,
                    type: 'object',
                    title: 'Amazon-Only',
                    properties: {
                        tier: {
                            required: true,
                            type: 'number',
                            title: 'Tier'
                        },
                        purchasingCategory: {
                            required: true,
                            type: 'string',
                            title: 'PurchasingCategory'
                        },
                        purchasingSubCategory: {
                            required: true,
                            type: 'string',
                            title: 'PurchasingSubCategory'
                        },
                        packagingType: {
                            required: true,
                            type: 'string',
                            title: 'PackagingType'
                        },
                        underlyingAvailability: {
                            required: true,
                            type: 'string',
                            title: 'UnderlyingAvailability',
                            enum: [
                                'backordered',
                                'manufacturer-out-of-stock',
                                'pre-ordered',
                                '2-3-days',
                                '1-2-weeks',
                                '4-6-weeks'
                            ]
                        },
                        replenishmentCategory: {
                            required: true,
                            type: 'string',
                            title: 'ReplenishmentCategory',
                            enum: [
                                'basic-replenishment',
                                'limited-replenishment',
                                'manufacturer-out-of-stock',
                                'new-product',
                                'non-replenishable',
                                'non-stockupable',
                                'obsolete',
                                'planned-replenishment'
                            ]
                        },
                        dropShipStatus: {
                            required: true,
                            type: 'string',
                            title: 'DropShipStatus',
                            enum: [
                                'drop-ship-disabled',
                                'drop-ship-disabled-by-buyer',
                                'drop-ship-enabled',
                                'drop-ship-enabled-no-auto-pricing',
                                'drop-ship-only'
                            ]
                        },
                        outOfStockWebsiteMessage: {
                            required: true,
                            type: 'string',
                            title: 'OutOfStockWebsiteMessage',
                            enum: [
                                'email-me-when-available',
                                'out-of-stock',
                                'pre-order-ute',
                                'underlying-availability'
                            ]
                        }
                    }
                },
                registeredParameter: {
                    required: false,
                    type: 'string',
                    title: 'RegisteredParameter',
                    enum: [
                        'PrivateLabel',
                        'Specialized',
                        'NonConsumer',
                        'PreConfigured'
                    ]
                }
            }
        },
        out: {
            type: 'object',
            properties: {
                outValue: {
                    type: 'string',
                    required: true,
                    title: 'Output Value'
                }
            }
        }
    });
}
