import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { InView } from 'react-intersection-observer';

export type PropTypes = {
  lastPage?: number;
  page?: number;
  pages?: number;
  setPages?;
  pageSize?: number;
  infiniteScroll?: boolean;
  populate?;
  timer?: boolean;
  timeoutSize?: number;
  rootMargin?: string;
  threshold?: number;
  elements?: any[];
  pageSelector?: string;
  setPageSelector?: any;
  other?: any;
  numberOfElements?: number;
  loading?: boolean;
  setLoading?: any;
};

export type StateTypes = {
  lastPage?: number;
  page?: number;
  pages?: number;
  setPages?;
  pageSize?: number;
  infiniteScroll?: boolean;
  populate?;
  startup?: boolean;
  timer?: boolean;
  timeoutSize?: number;
  rootMargin: string;
  threshold: number;
  elements?: any[];
  pageSelector?: string;
  setPageSelector?: any;
  other?: any;
  numberOfElements?: number;
  loading?: boolean;
  setLoading?: any;
};
export default class Paginate extends Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      lastPage: props.lastPage,
      page: props.page,
      pages: props.pages,
      setPages: props.setPages,
      pageSize: props.pageSize || 5,
      infiniteScroll: props.infiniteScroll || false,
      startup: true,
      rootMargin: props.rootMargin || '20px',
      threshold: props.threshold || 1.0,
      timer: props.timer || false,
      timeoutSize: props.timeoutSize || 1000,
      populate: props.populate,
      elements: props.elements,
      pageSelector: props.pageSelector || '',
      setPageSelector: props.setPageSelector,
      other: props.other,
      numberOfElements: props.numberOfElements || 0,
      loading: props.loading || false,
      setLoading: props.setLoading,
    };
  }

  public static async getElements(
    infiniteScroll?,
    elements?,
    received?,
    setElements?,
    _setPageSelector?
  ) {
    const tempElements = Array.isArray(elements)
      ? elements
      : elements === undefined || elements === null
      ? []
      : [elements];
    if (infiniteScroll && received && received.elements) {
      if (
        (received?.elements?.[0]?.priceTable !== undefined &&
          received?.elements?.[0]?.priceTable !== null &&
          tempElements?.[0]?.priceTable === undefined) ||
        (received?.elements?.[0]?.priceTable === undefined &&
          tempElements?.[0]?.priceTable !== undefined &&
          tempElements?.[0]?.priceTable !== null)
      ) {
        if (received?.elements) {
          await setElements(received.elements);
        } else {
          await setElements([]);
        }
        // await setPageSelector('first');
      } else {
        const reSheets = tempElements?.findIndex(
          (sheet) =>
            Array.isArray(received?.elements) &&
            sheet.id === received?.elements?.[0]?.id
        );
        if (reSheets !== -1) {
          const tempSheets = tempElements?.slice(0, reSheets);
          await setElements([...tempSheets, ...received.elements]);
          return received;
        }
        await setElements([...tempElements, ...received.elements]);
      }
    } else {
      await setElements(received?.elements);
    }
    return received;
  }

  async componentDidMount() {
    if (!this.state.infiniteScroll) await this.goToFirstPage();
  }
  public async componentDidUpdate(prevProps: PropTypes) {
    if (prevProps.other !== this.props.other) {
      this.setState(() => ({
        other: this.props.other,
      }));
    }
    if (
      prevProps.pageSelector !== this.props.pageSelector &&
      this.props.pageSelector !== undefined &&
      this.props.pageSelector !== null &&
      this.props.pageSelector?.length !== 0 &&
      this.props.pageSelector !== '' &&
      this.props.pageSelector?.trim()?.length !== 0 &&
      this.props.pageSelector?.trim() !== ''
    ) {
      this.setState(() => ({
        pageSelector: this.props.pageSelector,
      }));
      switch (this.props.pageSelector) {
        case 'first':
          await this.goToFirstPage();
          break;

        case 'last':
          await this.goToLastPage();
          break;

        case 'next':
          await this.goToNextPage();
          break;

        case 'refresh':
          await this.refresh();
          break;

        case 'deleteRefresh':
          await this.deleteRefresh();
          break;

        case 'clear':
          await this.clear();
          break;

        default:
          const newPage = Number(this.props.pageSelector);

          if (newPage >= 0) this.goToPage(newPage);
          break;
      }
    }
    if (prevProps.setPageSelector !== this.props.setPageSelector) {
      this.setState(() => ({
        setPageSelector: this.props.setPageSelector,
      }));
    }

    if (prevProps.lastPage !== this.props.lastPage) {
      this.setState(() => ({
        lastPage: this.props.lastPage,
      }));
    }
    if (prevProps.page !== this.props.page) {
      this.setState(() => ({
        page: this.props.page,
      }));
    }
    if (prevProps.pages !== this.props.pages) {
      this.setState(() => ({
        pages: this.props.pages,
      }));
    }
    if (prevProps.setPages !== this.props.setPages) {
      this.setState(() => ({
        setPages: this.props.setPages,
      }));
    }
    if (prevProps.pageSize !== this.props.pageSize) {
      this.setState(() => ({
        pageSize: this.props.pageSize,
      }));
    }
    if (prevProps.infiniteScroll !== this.props.infiniteScroll) {
      this.setState(() => ({
        infiniteScroll: this.props.infiniteScroll,
      }));
    }
    if (prevProps.elements !== this.props.elements) {
      this.setState(() => ({
        elements: this.props.elements,
      }));
      if (this?.props?.elements == undefined || this?.props?.elements?.length === 0) await this.clear();
    }
    if (prevProps.populate !== this.props.populate) {
      this.setState(() => ({
        populate: this.props.populate,
      }));
    }
    if (prevProps.timer !== this.props.timer) {
      this.setState(() => ({
        timer: this.props.timer,
      }));
    }
    if (prevProps.loading !== this.props.loading) {
      this.setState(() => ({
        loading: this.props.loading,
      }));
    }
    if (prevProps.setLoading !== this.props.setLoading) {
      this.setState(() => ({
        setLoading: this.props.setLoading,
      }));
    }
    if (prevProps.timeoutSize !== this.props.timeoutSize) {
      this.setState(() => ({
        timeoutSize: this.props.timeoutSize,
      }));
    }
  }

  public async timeoutSetter() {
    await this?.state?.setLoading?.(true);
    this.setState(() => ({
      startup: false,
      timer: true,
    }));
    setTimeout(this.clearTimer.bind(this), this.state.timeoutSize);
  }

  public async clearTimer() {
    await this.setState(() => ({
      timer: false,
    }));
  }

  public async isLocked() {
    return this?.state?.timer || this?.state?.loading || false;
  }

  public async retrive(currentPage, nextPage) {
    await this.timeoutSetter();
    const populate = await this?.state?.populate?.(
      nextPage,
      this?.state?.pageSize,
      this?.state?.other
    );
    await this.setState(() => ({
      lastPage: currentPage,
      page: nextPage,
      numberOfElements: populate?.elements?.length || 0,
    }));
    await this?.state?.setPages?.(populate?.pages || 1);
    this?.state?.setPageSelector?.('');
    await this?.state?.setLoading?.(false);
    return populate;
  }

  public async clear() {
    if (!(await this?.isLocked())) {
      await this.retrive(undefined, 0);
    }
  }

  public async deleteRefresh() {
    const currentPage = this?.state?.page || 0;
    const numberOfElements = this?.state?.numberOfElements || 0;
    if (!(await this?.isLocked())) {
      const nextPage =
        numberOfElements >= 1
          ? currentPage > 0
            ? currentPage - 1
            : currentPage
          : currentPage;
      await this.retrive(currentPage, nextPage);
    }
  }

  public async refresh() {
    if (!(await this?.isLocked())) {
      const currentPage = this?.state?.page || 0;
      await this.retrive(currentPage, currentPage);
    }
  }

  public async goToPage(nextPage = 0) {
    if (!(await this?.isLocked())) {
      let currentPage = this?.state?.page || 0;
      await this.retrive(currentPage, nextPage);
    }
  }

  public async goToNextPage() {
    if (!(await this?.isLocked())) {
      let currentPage = this?.state?.page || 0;
      let nextPage = this?.state?.page || 0;
      let currentPages = this?.state?.pages || 1;
      if (this?.state?.pages === undefined) {
        await this.retrive(currentPage, nextPage);
      } else if (
        (nextPage + 1 < currentPages &&
          nextPage + 1 !== this?.state?.lastPage) ||
        this?.state?.page === undefined ||
        this?.state?.pages === undefined
      ) {
        nextPage = nextPage + 1;
        await this.retrive(currentPage, nextPage);
      }
    }
  }

  public async goToFirstPage() {
    if (!(await this?.isLocked())) {
      let currentPage = this?.state?.page || 0;
      if (currentPage !== this?.state?.lastPage) {
        await this.retrive(currentPage, 0);
      }
    }
  }

  public async goToLastPage() {
    if (!(await this?.isLocked())) {
      let currentPage = this?.state?.page || 0;
      let nextPage = currentPage;
      let currentPages = this?.state?.pages || 1;
      if (nextPage !== this?.state?.lastPage) {
        nextPage = currentPages - 1;
        await this.retrive(currentPage, nextPage);
      }
    }
  }
  async handleIntersection(_inView, _entry) {
    const isLocked = await this?.isLocked();
    // const hasLastPage = this?.state?.lastPage !== undefined;
    // const hasPages = this?.state?.pages !== undefined;
    // const hasPage = this?.state?.page !== undefined;

    if (
      !(isLocked)
      // && (hasLastPage ||
      // hasPages ||
      // hasPage)
    ) {
      await this.goToNextPage();
    }
  }

  public async handlePageClick(event) {
    await this.goToPage(Number(event.selected));
  }

  public render() {
    const options = {
      onChange: this.handleIntersection.bind(this),
      // root: '#scrolling-container',
      rootMargin: this?.state?.rootMargin,
      threshold: this?.state?.threshold,
    };
    return (
      <>
        {this?.state?.infiniteScroll && <InView {...options} />}
        {!this?.state?.infiniteScroll && (
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={this.handlePageClick.bind(this)}
            pageRangeDisplayed={5}
            pageCount={this?.state?.pages || 1}
            initialPage={this?.state?.page || 0}
            previousLabel="<"
            // @ts-ignore
            renderOnZeroPageCount={null}
          />
        )}
      </>
    );
  }
}
