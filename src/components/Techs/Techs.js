function Techs() {

    return (
      <section className="techs">
          <h2 className={'section__header section__header_tech'}>Технологии</h2>
          <h3 className={'techs__header'}>7 технологий</h3>
          <p className={'techs__text'}>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
          <section className={'techs__table'}>
                  <article className={'techs__table__article'}>
                      <p className={'techs__table__text'}>HTML</p>
                   </article>
                  <article className={'techs__table__article'}>
                      <p className={'techs__table__text'}>CSS</p>
                  </article>
                  <article className={'techs__table__article'}>
                      <p className={'techs__table__text'}>JS</p>
                  </article>
                  <article className={'techs__table__article'}>
                      <p className={'techs__table__text'}>React</p>
                  </article>
                  <article className={'techs__table__article'}>
                      <p className={'techs__table__text'}>Git</p>
                  </article>
                  <article className={'techs__table__article'}>
                       <p className={'techs__table__text'}>Express.js</p>
                  </article>
                  <article className={'techs__table__article'}>
                       <p className={'techs__table__text'}>mongoDB</p>
                  </article>
          </section>
      </section>
    );
  }
  
  export default Techs;