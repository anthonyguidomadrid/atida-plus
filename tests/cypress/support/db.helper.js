export class DbHelper {
  buildDeleteQuery(table, whereClause) {
    return (this.query = `DELETE FROM ${table} WHERE ${whereClause}`)
  }

  setQueryExecution(myQuery, taskName = 'sprykerDB') {
    return cy.task(taskName, { sql: myQuery })
  }

  buildAndDeleteQueryByUser(email) {
    const table = 'public.spy_customer'
    const whereClause = `email='${email}'`
    const query = this.buildDeleteQuery(table, whereClause)
    this.setQueryExecution(query)
  }

  buildAndDeleteWhishlistItemQueryByUser(email) {
    const table = 'public.spy_wishlist_item'
    const whereClause = `fk_wishlist = (SELECT id_wishlist FROM public.spy_wishlist
      WHERE fk_customer = (SELECT id_customer FROM public.spy_customer WHERE email='${email}'))`
    const query = this.buildDeleteQuery(table, whereClause)
    this.setQueryExecution(query)
  }

  buildAndDeleteWhishlistQueryByUser(email) {
    const table = 'public.spy_wishlist'
    const whereClause = `fk_customer = (SELECT id_customer FROM public.spy_customer WHERE email='${email}')`
    const query = this.buildDeleteQuery(table, whereClause)
    this.setQueryExecution(query)
  }

  buildAndGetLastOrderByEmail(email) {
    const query = `SELECT public.spy_sales_order.created_at, order_reference, grand_total, name
    FROM public.spy_sales_order JOIN public.spy_sales_order_totals ON id_sales_order = public.spy_sales_order_totals.fk_sales_order
    JOIN public.spy_sales_order_item ON id_sales_order = public.spy_sales_order_item.fk_sales_order
    WHERE public.spy_sales_order.email='${email}'
    AND fk_oms_order_item_state != 2
    ORDER BY public.spy_sales_order.created_at desc LIMIT 1`
    return this.setQueryExecution(query)
  }

  buildAndGetProdUrlSlugByIds(fk_product, fk_locale) {
    const query = `SELECT url_slug FROM public.spy_product_abstract_localized_attributes 
  WHERE fk_product_abstract= ${fk_product} and fk_locale=${fk_locale}`
    return this.setQueryExecution(query)
  }

  getLastDiscountId(table, id) {
    const getDiscountVoucherId = `SELECT ${id} FROM ${table} ORDER BY ${id} DESC LIMIT 1`
    return this.setQueryExecution(getDiscountVoucherId)
  }

  buildAndDeleteCouponQueryByIds(poolId, discountId) {
    const storeDiscountTable = 'public.spy_discount_store'
    const discountTable = 'public.spy_discount'
    const voucherTable = 'public.spy_discount_voucher'
    const voucherPoolTable = 'public.spy_discount_voucher_pool'

    const storeDiscountTableQuery = this.buildDeleteQuery(
      storeDiscountTable,
      `fk_discount=${discountId}`
    )
    const discountTableQuery = this.buildDeleteQuery(
      discountTable,
      `id_discount=${discountId}`
    )
    const voucherTableQuery = this.buildDeleteQuery(
      voucherTable,
      `fk_discount_voucher_pool=${poolId}`
    )
    const voucherPoolTableQuery = this.buildDeleteQuery(
      voucherPoolTable,
      `id_discount_voucher_pool=${poolId}`
    )
    this.setQueryExecution(storeDiscountTableQuery)
    this.setQueryExecution(discountTableQuery)
    this.setQueryExecution(voucherTableQuery)
    this.setQueryExecution(voucherPoolTableQuery)
  }
}

export const dbhelper = new DbHelper()
