/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */
'use strict';

import * as _ from 'lodash';
import {Results} from 'realm';

type ILogicOperator = 'AND' | 'OR';
type EqualValueType = string | number | boolean | Date;
type CompareValueType = number | Date;

class RealmQuery {
    // private objects: Results<any>;
    // private criteria = [];
    // private inGroup = false;
    // private sortField: string;
    // private sortReverse: boolean;

    constructor(objects?: Results<any>) {
        this.objects = objects;

        this.criteria = [];
        this.inGroup = false;
        this.sortField = null;
        this.sortReverse = false;
    }

    addCriteria(critera) {
        if (this.inGroup) {
            let lastIndex = this.criteria.length - 1;
            let currentGroup: any[] = this.criteria[lastIndex];
            if (!currentGroup || !_.isArray(currentGroup)) {
                this.criteria.push([]);
                lastIndex += 1;
            }
            this.criteria[lastIndex].push(critera);
        } else {
            this.criteria.push(critera);
        }
        return this;
    }

    toString() {
        let criteraStr = [];
        for (let i in this.criteria) {
            if (_.isString(this.criteria[i])) {
                if (this.criteria[i] !== 'NOT') {
                    criteraStr.push(this.criteria[i])
                }
            } else {
                criteraStr.push('(' + this.criteria[i].join(' ') + ')');
            }
        }
        if (this.criteria.indexOf('NOT') > -1) {
            criteraStr = [`NOT(${criteraStr.join(' AND ')})`]
        }
        return criteraStr.join(' AND ');
    }

    getFilteredObjects() {
        const query = this.toString();
        let results = this.objects;
        if (query) {
            results = results.filtered(query);
        }
        return results;
    }

    average(fieldName: string): number {
        let results = this.getFilteredObjects();
        return _.sumBy(_.toArray(results), fieldName) / results.length;
    }

    beginGroup(): RealmQuery {
        this.inGroup = true;
        return this;
    }

    beginsWith(fieldName: string, value: string, casing?: boolean): RealmQuery {
        const op = casing ? 'BEGINSWITH[c]' : 'BEGINSWITH';
        if (_.isString(value)) value = `"${value}"`;
        return this.addCriteria(`${fieldName} ${op} ${value}`);
    }

    between(fieldName: string, from: CompareValueType, to: CompareValueType): RealmQuery {
        return this.addCriteria(`${fieldName} >= ${from} AND ${fieldName} <= ${to}`);
    }

    contains(fieldName: string, value: string, casing?: boolean): RealmQuery {
        const op = casing ? 'CONTAINS[c]' : 'CONTAINS';
        if (_.isString(value)) value = `"${value}"`;
        return this.addCriteria(`${fieldName} ${op} ${value}`);
    }

    count(): number {
        let results = this.getFilteredObjects();
        return results.length;
    }

    distinct(fieldName: string): Array<any> {
        let results = this.getFilteredObjects();
        return _.uniqBy(_.toArray(results), fieldName);
    }

    endGroup(): RealmQuery {
        this.inGroup = false;
        return this;
    }

    endsWith(fieldName: string, value: string, casing?: boolean): RealmQuery {
        const op = casing ? 'ENDSWITH[c]' : 'ENDSWITH';
        if (_.isString(value)) value = `"${value}"`;
        return this.addCriteria(`${fieldName} ${op} ${value}`);
    }

    equalTo(fieldName: string, value: EqualValueType): RealmQuery {
        if (_.isString(value)) value = `"${value}"`;
        return this.addCriteria(`${fieldName} == ${value}`);
    }

    findAll<M>(): Results<M> {
        let results = this.getFilteredObjects();
        if (this.sortField) {
            results = results.sorted(this.sortField, this.sortReverse);
        }
        return results;
    }

    findFirst<M>(): M {
        let results = this.getFilteredObjects();
        return results.length ? results[0] : undefined;
    }

    greaterThan(fieldName: string, value: CompareValueType): RealmQuery {
        return this.addCriteria(`${fieldName} > ${value}`);
    }

    greaterThanOrEqualTo(fieldName: string, value: CompareValueType): RealmQuery {
        return this.addCriteria(`${fieldName} >= ${value}`);
    }

    in(fieldName: string, values: EqualValueType[]): RealmQuery {
        const criteria = [];
        for (let i in values) {
            let value = values[i];
            if (_.isString(value)) {
                value = `"${value}"`;
            }
            criteria.push(`${fieldName} == ${value}`);
        }
        return this.addCriteria('(' + criteria.join(' OR ') + ')');
    }

    isEmpty(fieldName: string): RealmQuery {
        throw new Error('Not yet supported "isEmpty"');
    }

    isNotEmpty(fieldName: string): RealmQuery {
        throw new Error('Not yet supported "isNotEmpty"');
    }

    isNotNull(fieldName: string): RealmQuery {
        throw new Error('Not yet supported "isNotNull"');
    }

    isNull(fieldName: string): RealmQuery {
        throw new Error('Not yet supported "isNull"');
    }

    lessThan(fieldName: string, value: CompareValueType): RealmQuery {
        return this.addCriteria(`${fieldName} < ${value}`);
    }

    lessThanOrEqualTo(fieldName: string, value: CompareValueType): RealmQuery {
        return this.addCriteria(`${fieldName} <= ${value}`);
    }

    like(fieldName: string, value: string): RealmQuery {
        throw new Error('Not yet supported "like"');
    }

    max(fieldName: string): any {
        let results = this.getFilteredObjects();
        return _.maxBy(_.toArray(results), fieldName);
    }

    min(fieldName: string): any {
        let results = this.getFilteredObjects();
        return _.minBy(_.toArray(results), fieldName);
    }

    not(): RealmQuery {
        return this.addCriteria('NOT');
    }

    notEqualTo(fieldName: string, value: EqualValueType): RealmQuery {
        if (_.isString(value)) value = `"${value}"`;
        return this.addCriteria(`${fieldName} <> ${value}`);
    }

    and(): RealmQuery {
        return this.addCriteria('AND');
    }

    or(): RealmQuery {
        return this.addCriteria('OR');
    }

    sum(fieldName: string): number {
        let results = this.getFilteredObjects();
        return _.sumBy(_.toArray(results), fieldName);
    }

    sort(fieldName: string, order?: 'ASC' | 'DESC') {
        this.sortField = fieldName;
        this.sortReverse = order === 'DESC' ? true : false;
        return this;
    }

    /**
     * Combine to another query
     */
    join(query) {
        return this.addCriteria(query.toString());
    }

    static where(objects: Results<any>): RealmQuery {
        return new RealmQuery(objects);
    }

    static create(objects?: Results<any>): RealmQuery {
        return new RealmQuery(objects);
    }
}

module.exports = RealmQuery;