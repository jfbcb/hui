<template>
    <main class="login-main">
        <div class="page">
            <div class="hero">
                <header class="page-header container">
                    <div class="page-header__brand">
                        <h1><a href="/">wulaCMS</a></h1>
                    </div>
                    <div class="page-header__nav">
                        <nav class="main-nav">
                            <ul class="main-nav__list">
                                <li class="main-nav__link"><a href="#">Document</a></li>
                                <li class="main-nav__link"><a href="#">Git</a></li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <div class="hero__container">
                    <div class="hero__fin">
                        <div width="157" height="115"
                             class="i-amphtml-element i-amphtml-layout-fixed i-amphtml-layout-size-defined i-amphtml-layout"
                             style="width: 157px; height: 115px;">
                            <div class="i-amphtml-fill-content i-amphtml-replaced-content"></div>
                        </div>
                    </div>
                    <h1 class="hero__title">欢迎来到<strong>wula@CMS</strong></h1>
                </div>
            </div>
            <div class="waitlist container" id="early-access">
                <div class="waitlist__content">
                    <div>
                        <div class="waitlist__badge">
                            <span class="badge">New</span>
                        </div>
                        <div>
                            <h3 class="waitlist__title">WulaCMS will soon be publicly available.</h3>
                        </div>
                    </div>
                </div>
                <div class="waitlist__form">
                    <Row>
                        <Col :lg="24" :xs="24">
                        <slot name="form">
                            <wula-ajax-form :form-data="login" inline :show-reset="false" :url="url">
                                <Form-item label="" prop="username">
                                    <Input type="text" v-model="login.forms.username" placeholder="Username">
                                    <i class="fa fa-user" slot="prepend"></i>
                                    </Input>
                                </Form-item>
                                <Form-item label="" prop="password">
                                    <Input type="text" v-model="login.forms.password" placeholder="password">
                                    <i class="fa fa-unlock-alt" slot="prepend"></i>
                                    </Input>
                                </Form-item>
                            </wula-ajax-form>
                        </slot>
                        </Col>
                    </Row>
                </div>

            </div>
            <footer class="page-footer">
                <div class="container">
                    <div class="page-header__nav">
                        <nav class="footer-nav">
                            <ul class="footer-nav__list">
                                <li class="footer-nav__link"><a href="mailto:admin@wulaphp.com"> <i
                                        class="fa fa-envelope-o"></i> admin@wulaphp.com</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </footer>
        </div>
    </main>
</template>

<script lang="babel">
    export default{
        name      : 'LoginPage',
        components: {},
        props     : {
            url: {
                type: String
            }
        },
        data(){
            return {
                login: {
                    forms: {
                        user    : '',
                        password: ''
                    },
                    rules: {
                        username: {
                            required: true
                        },
                        password: {
                            required: true
                        }
                    }
                }
            }
        }

    }
</script>
