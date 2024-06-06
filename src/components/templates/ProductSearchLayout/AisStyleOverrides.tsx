import { FunctionComponent } from 'react'

import checkMarkBox from '~assets/svg/navigation-16px/NavCheckmarkSmall.svg'

export const AisStyleOverrides: FunctionComponent = () => (
  <style global jsx>{`
    .ais-SortBy {
      width: 100%;
      border-radius: 4px;
    }
    .ais-ClearRefinements-button {
      font-size: 0.875rem;
      font-weight: 300;
      text-decoration-line: underline;
    }
    .ais-RefinementList,
    .ais-SearchBox-input {
      font-size: 0.875rem;
      font-weight: 300;
      border-radius: 4px;
    }

    .ais-SearchBox-form {
      position: relative;
      width: 100%;
      margin-bottom: 12px;
    }

    .ais-SortBy-select {
      border-radius: 4px;
    }

    .ais-SearchBox-input {
      width: 100%;
      padding: 7px 32px 7px 36px;

      /* UI / Light-Grey */
      border: 1px solid #d6d5d2;
    }

    .ais-SearchBox-input::-webkit-search-cancel-button {
      display: none;
    }

    .ais-SearchBox-submit {
      position: absolute;
      top: 12px;
      left: 12px;
    }

    .ais-SearchBox-submitIcon {
      width: 15px;
      height: 15px;
      margin-top: 2px;
    }

    .ais-SearchBox-reset {
      position: absolute;
      top: 15px;
      right: 12px;
    }

    .ais-RefinementList-label {
      position: relative;
      display: block;
    }

    .ais-RefinementList-checkbox,
    .ais-ToggleRefinement-checkbox {
      position: absolute;
      left: 0;
      top: 4px;
    }

    .ais-RefinementList-checkbox[type='checkbox'],
    .ais-ToggleRefinement-checkbox[type='checkbox'] {
      display: none;
    }

    .ais-RefinementList-checkbox[type='checkbox'] + label,
    .ais-RefinementList-checkbox[type='checkbox'] + label,
    .ais-ToggleRefinement-checkbox[type='checkbox'] + span,
    .ais-ToggleRefinement-checkbox[type='checkbox'] + span {
      display: inline-block;
      position: relative;
      margin: 4px 0;
      cursor: pointer;
    }
    /* TODO: PLUS-3013 This should be cleaned up as part of a bigger refactor for the special offers filters */
    [data-testid='filterPromotionPanel'] span.ais-ToggleRefinement-labelText,
    [data-testid='promotionFilter'] span.ais-ToggleRefinement-labelText {
      margin: 0;
    }
    .ais-RefinementList-checkbox[type='checkbox'] + label:before,
    .ais-RefinementList-checkbox[type='checkbox'] + span:before,
    .ais-ToggleRefinement-checkbox[type='checkbox'] + label:before,
    .ais-ToggleRefinement-checkbox[type='checkbox'] + span:before {
      content: '';
      /* UI / Light-Grey */
      border: 1px solid #d6d5d2;
      height: 16px;
      width: 16px;
      display: inline-block;
      padding: 0;
      position: absolute;
      left: 0;
      top: 3px;
      border-radius: 4px;
    }
    .ais-RefinementList-checkbox[type='checkbox']:checked + label:before,
    .ais-RefinementList-checkbox[type='checkbox']:checked + span:before,
    .ais-ToggleRefinement-checkbox[type='checkbox']:checked + span:before,
    .ais-ToggleRefinement-checkbox[type='checkbox']:checked + label:before {
      content: '';
      color: #fff;
      background-color: #1a1d32;
      background-image: url(${checkMarkBox});
      background-size: 14px;
      background-position: center;
      background-repeat: no-repeat;
      /* Primary / Oxford Blue */
      border: 1px solid #1a1d32;
      font-size: 14px;
    }

    .ais-RefinementList-labelText,
    .ais-ToggleRefinement-labelText {
      display: inline-block;
      padding-left: 28px;
      font-size: 14px;
    }

    .ais-RefinementList-count {
      display: inline-block;
      color: #969696;
      margin-left: 2px;
    }
    .ais-RefinementList-count:before {
      content: '(';
    }
    .ais-RefinementList-count:after {
      content: ')';
    }

    .ais-RefinementList-showMore {
      margin-top: 4px;
    }

    .ais-Highlight-highlighted {
      font-style: normal;
      font-weight: 500;
    }
    .ais-RefinementList-showMore[disabled] {
      display: none !important;
    }
    .ais-ToggleRefinement--noRefinement {
      display: none !important;
    }
    .ais-Panel-header {
      font-family: Sohne, Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 24px;
      font-weight: 500;
      border-bottom-width: 1px;
      border-color: rgba(214, 213, 210, 1);
      margin-bottom: 12px;
    }
    .ais-RefinementList-item {
      margin-bottom: 10px;
    }
    @media only screen and (max-width: 1024px) {
      .ais-Panel-header {
        display: none;
      }
      .ais-RefinementList-count {
        display: inline-block;
        color: #969696;
        margin-left: 2px;
        font-size: 16px;
      }
      .ais-RefinementList-count:before {
        content: '(';
      }
      .ais-RefinementList-count:after {
        content: ')';
      }
      .ais-RefinementList-labelText,
      .ais-ToggleRefinement-labelText {
        padding-left: 36px;
        font-size: 16px;
      }
      .ais-RefinementList-checkbox[type='checkbox'] + label:before,
      .ais-RefinementList-checkbox[type='checkbox'] + span:before,
      .ais-ToggleRefinement-checkbox[type='checkbox'] + label:before,
      .ais-ToggleRefinement-checkbox[type='checkbox'] + span:before {
        height: 24px;
        width: 24px;
        top: 0px;
        background-size: 18px !important;
      }
      .ais-SearchBox-input {
        padding: 11px 32px 11px 36px;
      }
      .ais-SearchBox-submitIcon {
        margin-top: 6px;
      }
    }
  `}</style>
)
