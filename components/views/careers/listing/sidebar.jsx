import React from 'react';
import { TagField } from 'crewhrm-materials/tag-field/tag-field.jsx';
import { __ } from 'crewhrm-materials/helpers.jsx';
import { countries_object, employment_types } from 'crewhrm-materials/data.jsx';
import { Conditional } from 'crewhrm-materials/conditional.jsx';

import style from './listing.module.scss';

export function CareersSidebar({ setFilter, filters, jobs_country_codes = [], departments = [] }) {
    const filterList = {
        department_id: {
            section_label: __('Departments'),
            selection_type: 'list',
            options: departments.map((d) => {
                return {
                    id: d.department_id,
                    label: d.department_name,
                    count: d.job_count
                };
            })
        },
        country_code: {
            section_label: __('Location'),
            selection_type: 'tag',
            options: jobs_country_codes.map((code) => {
                return {
                    id: code,
                    label: countries_object[code]
                };
            })
        },
        employment_type: {
            section_label: 'Job Type',
            selection_type: 'list',
            options: Object.keys(employment_types).map((type) => {
                return {
                    id: type,
                    label: employment_types[type]
                };
            })
        }
    };

    const _setFilter = (name, value) => {
        setFilter(name, filters[name] == value ? null : value);
    };

    return (
        <div data-crew="sidebar" className={'sidebar'.classNames(style)}>
            <div>
                {Object.keys(filterList).map((filter_key) => {
                    let { section_label, selection_type, options = [] } = filterList[filter_key];

                    return options.length ? (
                        <div
                            key={filter_key}
                            className={'margin-bottom-23 overflow-auto'.classNames()}
                        >
                            <span
                                className={'d-block font-size-14 font-weight-700 line-height-24 letter-spacing--14 color-text-light margin-bottom-16 text-transform-uppercase'.classNames()}
                            >
                                {section_label}
                            </span>

                            {selection_type == 'list'
                                ? options.map((option) => {
                                      let { id, label, count } = option;
                                      let is_active = filters[filter_key] == id;
                                      return (
                                          <span
                                              key={id}
                                              className={`d-block font-size-14 cursor-pointer margin-bottom-18 font-weight-500 ${is_active ? 'color-text' : 'color-text-light'}`.classNames()}
                                              onClick={() => _setFilter(filter_key, id)}
                                          >
                                              {label} {count ? `(${count})` : null}
                                          </span>
                                      );
                                  })
                                : null}

                            {selection_type == 'tag' ? (
                                <div>
                                    <TagField
                                        theme="tag"
                                        behavior="radio"
                                        options={options}
                                        value={filters[filter_key]}
                                        onChange={(v) => _setFilter(filter_key, v)}
                                    />
                                </div>
                            ) : null}
                        </div>
                    ) : null;
                })}

				<Conditional show={Object.keys(filters).length>1 || filters.page>1}>
					<span className={'d-flex align-items-center column-gap-6 font-size-14 color-text-light color-hover-text cursor-pointer'.classNames()} onClick={()=>setFilter({})} style={{marginLeft: '-3px'}}>
						<i className={'ch-icon ch-icon-times font-size-18'.classNames()}></i> {__('Clear Filters')}
					</span>
				</Conditional>
            </div>
        </div>
    );
}
