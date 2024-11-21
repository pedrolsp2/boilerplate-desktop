import {
    ColumnFiltersState,
    ColumnOrderState,
    ColumnPinningState,
    ColumnSizingState,
    ExpandedState,
    PaginationState,
    RowSelectionState,
    SortingState,
    TableState,
    GroupingState,
    Updater,
    VisibilityState,
} from '@tanstack/react-table'
import { useCallback, useEffect, useMemo, useReducer } from 'react'
import {
    OnColumnFiltersStateChangeFn,
    OnColumnOrderStateChangeFn,
    OnColumnPinningStateChangeFn,
    OnColumnSizingChangeFn,
    OnColumnVisibilityStateChangeFn,
    OnExpandedStateChangeFn,
    OnPaginationStateChangeFn,
    OnRowSelectionChangeFn,
    OnSortingStateChangeFn,
    OnTableStateChangeFn,
    Persist,
    OnGroupingStateChangeFn,
} from '@/components/Table/type'
import {
    ActionNames,
    HandleGenericStateUpdateProps,
    Reducer,
    ReducerState,
    UseTableStateProps,
    UseTableStateReturn,
} from './type'

const getStateValue = <T>(updater: Updater<T>, state: T) => {
    return typeof updater === 'function'
        ? (updater as (old: T) => T)(state)
        : updater
}

const reducer: Reducer = (state, action) => {
    const { payload, type } = action

    switch (type) {
        case ActionNames.SET_COLUMN_FILTER:
            return {
                ...state,
                columnFilters: getStateValue(payload, state.columnFilters),
            }
        case ActionNames.SET_COLUMN_ORDER: {
            return {
                ...state,
                columnOrder: getStateValue(payload, state.columnOrder),
            }
        }

        case ActionNames.SET_COLUMN_PINNING: {
            return {
                ...state,
                columnPinning: getStateValue(payload, state.columnPinning),
            }
        }
        case ActionNames.SET_COLUMN_SIZING: {
            return {
                ...state,
                columnSizing: getStateValue(payload, state.columnSizing),
            }
        }
        case ActionNames.SET_EXPANDED: {
            return {
                ...state,
                expanded: getStateValue(payload, state.expanded),
            }
        }
        case ActionNames.SET_PAGINATION: {
            return {
                ...state,
                pagination: getStateValue(payload, state.pagination),
            }
        }
        case ActionNames.SET_ROW_SELECTION: {
            return {
                ...state,
                rowSelection: getStateValue(payload, state.rowSelection),
            }
        }
        case ActionNames.SET_SORTING: {
            return {
                ...state,
                sorting: getStateValue(payload, state.sorting),
            }
        }
        case ActionNames.SET_TABLE_STATE: {
            return {
                ...state,
                ...getStateValue(payload as TableState, state),
            }
        }
        case ActionNames.SET_VISIBILITY: {
            return {
                ...state,
                columnVisibility: getStateValue(
                    payload,
                    state.columnVisibility
                ),
            }
        }
        case ActionNames.SET_GROUPING: {
            return {
                ...state,
                grouping: getStateValue(payload, state.grouping),
            }
        }
        default: {
            return state
        }
    }
}

const getInitialState = ({
    key,
    omit,
    storage = localStorage,
    canPersist,
    columnFilters,
    columnOrder,
    columnPinning,
    columnSizing,
    expanded,
    pagination,
    rowSelection,
    sorting,
    columnVisibility,
    columnSizingInfo,
    globalFilter,
    grouping,
    rowPinning,
}: Partial<ReducerState> & Persist): ReducerState => {
    const initialState: ReducerState = {
        columnVisibility: columnVisibility || {},
        columnFilters: columnFilters || [],
        columnOrder: columnOrder || [],
        columnPinning: columnPinning || {},
        columnSizing: columnSizing || {},
        expanded: expanded || {},
        pagination: pagination || {
            pageIndex: 0,
            pageSize: 0,
        },
        rowSelection: rowSelection || {},
        sorting: sorting || [],
        columnSizingInfo: columnSizingInfo || {
            columnSizingStart: [],
            deltaOffset: 0,
            deltaPercentage: 0,
            isResizingColumn: false,
            startOffset: 0,
            startSize: 0,
        },
        globalFilter: globalFilter || '',
        grouping: grouping || [],
        rowPinning: rowPinning || {},
    }

    if (!canPersist || !key) return initialState

    try {
        const storedState = storage.getItem(key)

        if (!storedState) return initialState

        const parsedState: ReducerState = JSON.parse(storedState)

        if (omit) {
            for (const key of omit) {
                delete parsedState[key]
            }
        }

        return {
            ...initialState,
            ...parsedState,
        }
    } catch (error) {
        console.error(error)
        return initialState
    }
}

const persistOnStorage = ({
    canPersist,
    key,
    omit,
    storage = localStorage,
}: Persist) => {
    if (!canPersist) return null

    return (state: ReducerState) => {
        if (!key) return null

        const stateToStore = { ...state }

        if (omit) {
            for (const key of omit) {
                delete stateToStore[key]
            }
        }

        storage.setItem(key, JSON.stringify(stateToStore))
    }
}

export const useTableState = ({
    persist,
    onColumnFiltersChange,
    onColumnOrderStateChange,
    onColumnVisibilityStateChange,
    onExpandedStateChange,
    onPaginationChange,
    onRowSelectionChange,
    onTableStateChange,
    onColumnPinningStateChange,
    onColumnSizingChange,
    onSortingStateChange,
    onGroupingStateChange,
    ...rest
}: UseTableStateProps): UseTableStateReturn => {
    const {
        columnFilters,
        columnOrder,
        columnPinning,
        columnSizing,
        expanded,
        pagination,
        rowSelection,
        sorting,
        columnVisibility,
        grouping,
    } = rest

    const initialState = useMemo(
        () =>
            getInitialState({
                ...rest,
                canPersist: !!persist?.canPersist,
                key: persist?.key || '',
                storage: persist?.storage,
                omit: persist?.omit,
            }),
        []
    )

    const [state, dispatch] = useReducer<Reducer, ReducerState>(
        reducer,
        initialState,
        (state) => state
    )

    const handleStateChange = useCallback<OnTableStateChangeFn>(
        (updaterOrValue) => {
            if (!onTableStateChange)
                return dispatch({
                    payload: updaterOrValue,
                    type: ActionNames.SET_TABLE_STATE,
                })

            if (typeof updaterOrValue === 'function') {
                onTableStateChange(
                    updaterOrValue({
                        ...rest,
                    } as TableState)
                )
            } else {
                onTableStateChange(updaterOrValue)
            }
        },
        [onTableStateChange]
    )

    const handleGenericStateUpdate = useCallback(
        <T>({ state, setState, updater }: HandleGenericStateUpdateProps<T>) => {
            if (typeof updater === 'function') {
                setState((updater as (old: T) => T)(state))
            } else {
                setState(updater)
            }
        },
        []
    )

    const handleColumnOrderChange = useCallback<OnColumnOrderStateChangeFn>(
        (updaterOrValue) => {
            if (!onColumnOrderStateChange)
                return dispatch({
                    type: ActionNames.SET_COLUMN_ORDER,
                    payload: updaterOrValue,
                })

            handleGenericStateUpdate<ColumnOrderState>({
                state: columnOrder || state.columnOrder,
                updater: updaterOrValue,
                setState: onColumnOrderStateChange,
            })
        },
        [onColumnOrderStateChange, columnOrder, state.columnOrder]
    )

    const handleRowSelectionChange = useCallback<OnRowSelectionChangeFn>(
        (updaterOrValue) => {
            if (!onRowSelectionChange)
                return dispatch({
                    type: ActionNames.SET_ROW_SELECTION,
                    payload: updaterOrValue,
                })

            handleGenericStateUpdate<RowSelectionState>({
                state: rowSelection || state.rowSelection,
                setState: onRowSelectionChange,
                updater: updaterOrValue,
            })
        },
        [onRowSelectionChange, rowSelection, state.rowSelection]
    )

    const handleExpandedChange = useCallback<OnExpandedStateChangeFn>(
        (updaterOrValue) => {
            if (!onExpandedStateChange)
                return dispatch({
                    type: ActionNames.SET_EXPANDED,
                    payload: updaterOrValue,
                })

            handleGenericStateUpdate<ExpandedState>({
                state: expanded || state.expanded,
                setState: onExpandedStateChange,
                updater: updaterOrValue,
            })
        },
        [onExpandedStateChange, expanded, state.expanded]
    )

    const handlePaginationChange = useCallback<OnPaginationStateChangeFn>(
        (updaterOrValue) => {
            if (!onPaginationChange)
                return dispatch({
                    type: ActionNames.SET_PAGINATION,
                    payload: updaterOrValue,
                })

            handleGenericStateUpdate<PaginationState>({
                state: pagination || state.pagination,
                updater: updaterOrValue,
                setState: onPaginationChange,
            })
        },
        [onPaginationChange, pagination, state.pagination]
    )

    const handleColumnFiltersChange = useCallback<OnColumnFiltersStateChangeFn>(
        (updaterOrValue) => {
            if (!onColumnFiltersChange)
                return dispatch({
                    type: ActionNames.SET_COLUMN_FILTER,
                    payload: updaterOrValue,
                })

            handleGenericStateUpdate<ColumnFiltersState>({
                state: columnFilters || state.columnFilters,
                updater: updaterOrValue,
                setState: onColumnFiltersChange,
            })
        },
        [onColumnFiltersChange, columnFilters, state.columnFilters]
    )

    const handleColumnVisibilityChange =
        useCallback<OnColumnVisibilityStateChangeFn>(
            (updaterOrValue) => {
                if (!onColumnVisibilityStateChange)
                    return dispatch({
                        type: ActionNames.SET_VISIBILITY,
                        payload: updaterOrValue,
                    })

                handleGenericStateUpdate<VisibilityState>({
                    state: columnVisibility || state.columnVisibility,
                    updater: updaterOrValue,
                    setState: onColumnVisibilityStateChange,
                })
            },
            [
                onColumnVisibilityStateChange,
                columnVisibility,
                state.columnVisibility,
            ]
        )

    const handleColumnPinningStateChange =
        useCallback<OnColumnPinningStateChangeFn>(
            (updaterOrValue) => {
                if (!onColumnPinningStateChange)
                    return dispatch({
                        type: ActionNames.SET_COLUMN_PINNING,
                        payload: updaterOrValue,
                    })

                handleGenericStateUpdate<ColumnPinningState>({
                    state: columnPinning || state.columnPinning,
                    updater: updaterOrValue,
                    setState: onColumnPinningStateChange,
                })
            },
            [onColumnPinningStateChange, columnPinning, state.columnPinning]
        )

    const handleColumnSizingStateChange = useCallback<OnColumnSizingChangeFn>(
        (updaterOrValue) => {
            if (!onColumnSizingChange)
                return dispatch({
                    type: ActionNames.SET_COLUMN_SIZING,
                    payload: updaterOrValue,
                })

            handleGenericStateUpdate<ColumnSizingState>({
                state: columnSizing || state.columnSizing,
                setState: onColumnSizingChange,
                updater: updaterOrValue,
            })
        },
        [onColumnSizingChange, columnSizing, state.columnSizing]
    )

    const handleSortingStateChange = useCallback<OnSortingStateChangeFn>(
        (updaterOrValue) => {
            if (!onSortingStateChange)
                return dispatch({
                    type: ActionNames.SET_SORTING,
                    payload: updaterOrValue,
                })

            handleGenericStateUpdate<SortingState>({
                state: sorting || state.sorting,
                setState: onSortingStateChange,
                updater: updaterOrValue,
            })
        },
        [onSortingStateChange, sorting, state.sorting]
    )

    const handleGroupingStateChange = useCallback<OnGroupingStateChangeFn>(
        (updaterOrValue) => {
            if (!onGroupingStateChange)
                return dispatch({
                    type: ActionNames.SET_GROUPING,
                    payload: updaterOrValue,
                })

            handleGenericStateUpdate<GroupingState>({
                state: grouping || state.grouping,
                setState: onGroupingStateChange,
                updater: updaterOrValue,
            })
        },
        [onGroupingStateChange, grouping, state.grouping]
    )

    useEffect(() => {
        if (persist) {
            const store = persistOnStorage({ ...persist })

            if (store) store(state)
        }
    }, [state])

    return {
        state: {
            ...state,
            ...rest,
        },
        handleGroupingStateChange,
        handleStateChange,
        handleColumnOrderChange,
        handleRowSelectionChange,
        handleExpandedChange,
        handlePaginationChange,
        handleColumnFiltersChange,
        handleColumnVisibilityChange,
        handleColumnPinningStateChange,
        handleColumnSizingStateChange,
        handleSortingStateChange,
    }
}
