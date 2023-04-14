<script lang="ts">
  import loadingImg from '../assets/images/loading.svg'
  const action = '/detect.json'
  const method = 'POST'

  let inputUrl = ''
  let loading = false
  let invalid = false
  let error = ''
  let version = ''
  let submitted = false

  async function submitUrl(url: string) {
    if (!url) {
      invalid = true
      return
    }

    // Reset states
    loading = true
    invalid = submitted = false
    error = version = ''

    try {
      const res = await fetch(action, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      })
      if (res.ok) {
        const json = await res.json()
        version = json.version
      } else {
        try {
          const json = await res.json()
          error = json.error
        } catch (e) {
          error = res.statusText
        }
      }
      submitted = true
    } catch (error) {
      error = (error as Error).message
    } finally {
      loading = false
    }
  }
</script>

<form class="flex-column" on:submit|preventDefault={() => submitUrl(inputUrl)}>
  <label for="url">URL</label>
  <div class="flex-row input-wrap">
    <input
      required
      bind:value={inputUrl}
      class:invalid
      type="text"
      name="url"
      id="url"
      placeholder="https://"
      on:paste={(e) => {
        const value = e.clipboardData?.getData('text')
        if (value) {
          submitUrl(value)
        }
      }}
    />
    <button type="submit" class="flex-center" class:loading disabled={loading}>
      <img
        src={loadingImg.src}
        alt="loading"
        class="loading-image"
        width={18}
        height={18}
      />
      <span>Detect</span>
    </button>
  </div>
</form>

{#if error}
  <p class="error">{error}</p>
{:else if !loading && submitted}
  <p class="result">
    {#if version}
      Version detected: <code>{version}</code>
    {:else}
      No version detected
    {/if}
  </p>
{/if}

<style>
  .input-wrap {
    gap: 10px;
  }
  input.invalid {
    background-color: rgba(255, 0, 0, 0.1);
  }
  button .loading-image {
    display: none;
    position: absolute;
  }
  button.loading .loading-image {
    display: block;
  }
  button.loading span {
    visibility: hidden;
  }
  .error {
    color: var(--error-color);
  }
  .result {
    color: var(--success-color);
    font-size: 2em;
    padding: 10px 20px;
    background-color: var(--border-color);
    border-radius: var(--border-radius);
  }
</style>
